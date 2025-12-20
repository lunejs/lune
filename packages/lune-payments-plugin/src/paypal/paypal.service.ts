import type { CreateOrderRequestBody, OrderResponseBody } from '@paypal/paypal-js';
import axios, { isAxiosError } from 'axios';
import { customAlphabet } from 'nanoid';

import { LuneLogger, LunePrice } from '@lune/common';
import type { ExecutionContext, ID, OrderRepository } from '@lune/core';

import type { PaypalServiceError } from './paypal.errors';
import { OrderNotFoundError, PaypalRequestError } from './paypal.errors';
import type {
  CreatePaypalOrderResponse,
  PaypalCapturePaymentResponse,
  PaypalErrorResponse,
  PaypalGenerateAccessTokenResponse
} from './paypal.types';

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const PAYPAL_SANDBOX_BASE_URL = 'https://api-m.sandbox.paypal.com';
const PAYPAL_LIVE_BASE_URL = 'https://api-m.paypal.com';

export class PaypalService {
  private readonly orderRepository: OrderRepository;

  constructor(
    ctx: ExecutionContext,
    private readonly config: any
  ) {
    this.orderRepository = ctx.repositories.order;
  }

  /**
   * Create a paypal order
   *
   * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
   */
  async createOrder(orderId: ID): Promise<CreateOrderResult> {
    try {
      const order = await this.orderRepository.findOneWithDetails(orderId);

      if (!order) return new OrderNotFoundError(`Order with id ${orderId} not found`);

      const accessToken = await this.generateAccessToken();

      const payload: CreateOrderRequestBody = {
        intent: 'CAPTURE',
        purchase_units: [
          {
            invoice_id: this.generateInvoiceId(),
            items: order.lines.map(line => ({
              sku: line.variant.sku ?? undefined,
              name: line.variant.product.name,
              quantity: String(line.quantity),
              unit_amount: {
                value: String(LunePrice.toDollar(line.unitPrice)),
                currency_code: 'USD'
              },
              category: 'PHYSICAL_GOODS',
              description: line.variant.optionValues
                ?.map(opv => opv.preset?.name ?? opv.name ?? '')
                .join(', ')
            })),
            amount: {
              value: String(LunePrice.toDollar(order.total)),
              currency_code: 'USD',
              breakdown: {
                discount: {
                  currency_code: 'USD',
                  value: String(
                    LunePrice.toDollar(
                      order.appliedDiscounts.reduce((prev, curr) => prev + curr.discountedAmount, 0)
                    )
                  )
                },
                shipping: {
                  currency_code: 'USD',
                  value: String(LunePrice.toDollar(order.fulfillment?.total ?? 0))
                },
                item_total: {
                  value: String(LunePrice.toDollar(order.subtotal)),
                  currency_code: 'USD'
                }
              }
            }
          }
        ]
      };

      const { data } = await axios.post<CreatePaypalOrderResponse>(
        `${this.getBaseUrl()}/v2/checkout/orders`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
            // Uncomment one of these to force an error for negative testing (in sandbox mode only).
            // Documentation: https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
            // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
          }
        }
      );

      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        const paypalError: PaypalErrorResponse = error.response?.data;

        LuneLogger.error(paypalError);
      } else {
        LuneLogger.error(error);
      }

      return new PaypalRequestError('Could not create paypal order');
    }
  }

  /**
   * Capture payment for a paypal order
   *
   * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
   */
  async capturePayment(paypalOrderId: string): Promise<CapturePaymentResult> {
    try {
      const accessToken = await this.generateAccessToken();
      const url = `${this.getBaseUrl()}/v2/checkout/orders/${paypalOrderId}/capture`;
      const { data } = await axios.post<PaypalCapturePaymentResponse>(
        url,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
            // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
            // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
            // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
          }
        }
      );

      const orderDetails = await this.getOrderDetails(paypalOrderId);

      return {
        success: true,
        data,
        invoiceId: orderDetails.purchase_units?.[0].invoice_id ?? ''
      };
    } catch (error) {
      if (isAxiosError(error)) {
        const paypalError: PaypalErrorResponse = error.response?.data;

        return { success: false, error: paypalError };
      } else {
        return { success: false, error: error };
      }
    }
  }

  /**
   * Get paypal order details
   */
  private async getOrderDetails(orderId: string) {
    const accessToken = await this.generateAccessToken();

    const { data } = await axios.get<OrderResponseBody>(
      `${this.getBaseUrl()}/v2/checkout/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    return data;
  }

  /**
   * Generates an access token for the paypal api
   *
   * @see https://developer.paypal.com/api/rest/#link-getaccesstoken
   */
  private async generateAccessToken() {
    const { clientId, secret } = this.config;

    if (!clientId || !secret) {
      throw new Error('generateAccessToken: Paypal client id and secret are required');
    }

    const token = Buffer.from(clientId + ':' + secret).toString('base64');

    const { data } = await axios.post<PaypalGenerateAccessTokenResponse>(
      `${this.getBaseUrl()}/v1/oauth2/token`,
      { grant_type: 'client_credentials' },
      {
        headers: {
          Authorization: `Basic ${token}`,
          'content-type': 'application/x-www-form-urlencoded'
        }
      }
    );

    return data.access_token;
  }

  /**
   * @description
   * Generates an invoice id for the paypal order. This is needed to have a common identifier between lune and paypal.
   */
  private generateInvoiceId() {
    const id = customAlphabet(alphabet, 16)();

    return `PPAL-${id}`;
  }

  private getBaseUrl() {
    return this.config.devMode ? PAYPAL_SANDBOX_BASE_URL : PAYPAL_LIVE_BASE_URL;
  }
}

type CapturePaymentResult =
  | {
      success: true;
      data: PaypalCapturePaymentResponse;
      /**
       * @description
       * The invoice id which the paypal order was created with.
       * Paypal does not return the actual transaction id that is shared between the buyer and the seller,
       * so to have a common id between lune and paypal, we generate an invoice id and use it as the transaction id.
       */
      invoiceId: string;
    }
  | {
      success: false;
      error: any;
    };

type CreateOrderResult = PaypalServiceError | CreatePaypalOrderResponse;
