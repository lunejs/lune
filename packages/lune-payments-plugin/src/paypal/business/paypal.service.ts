import type { CreateOrderRequestBody } from '@paypal/paypal-js';
import { isAxiosError } from 'axios';
import { customAlphabet } from 'nanoid';

import { LuneLogger, LunePrice } from '@lune/common';
import type { ExecutionContext, ID, OrderRepository } from '@lune/core';

import type { PayPal } from '../adapters/paypal';
import type { PaypalErrorResponse } from '../adapters/paypal.types';

import { OrderNotFoundError, PaypalRequestError } from './paypal.errors';

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export class PaypalService {
  private readonly orderRepository: OrderRepository;

  constructor(
    ctx: ExecutionContext,
    private readonly paypal: PayPal
  ) {
    this.orderRepository = ctx.repositories.order;
  }

  /**
   * Create a paypal order
   *
   * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
   */
  async createOrder(orderId: ID) {
    try {
      const order = await this.orderRepository.findOneWithDetails(orderId);

      if (!order) return new OrderNotFoundError(`Order with id ${orderId} not found`);

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

      const data = await this.paypal.createOrder(payload);

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
  // async capturePayment(paypalOrderId: string): Promise<CapturePaymentResult> {
  //   try {
  //     const accessToken = await this.generateAccessToken();
  //     const url = `${this.getBaseUrl()}/v2/checkout/orders/${paypalOrderId}/capture`;
  //     const { data } = await axios.post<PaypalCapturePaymentResponse>(
  //       url,
  //       {},
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${accessToken}`
  //           // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
  //           // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
  //           // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
  //           // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
  //           // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
  //         }
  //       }
  //     );

  //     const orderDetails = await this.getOrderDetails(paypalOrderId);

  //     return {
  //       success: true,
  //       data,
  //       invoiceId: orderDetails.purchase_units?.[0].invoice_id ?? ''
  //     };
  //   } catch (error) {
  //     if (isAxiosError(error)) {
  //       const paypalError: PaypalErrorResponse = error.response?.data;

  //       return { success: false, error: paypalError };
  //     } else {
  //       return { success: false, error: error };
  //     }
  //   }
  // }

  /**
   * @description
   * Generates an invoice id for the paypal order. This is needed to have a common identifier between lune and paypal.
   */
  private generateInvoiceId() {
    const id = customAlphabet(alphabet, 16)();

    return `PPAL-${id}`;
  }
}

// type CapturePaymentResult =
//   | {
//       success: true;
//       data: PaypalCapturePaymentResponse;
//       /**
//        * @description
//        * The invoice id which the paypal order was created with.
//        * Paypal does not return the actual transaction id that is shared between the buyer and the seller,
//        * so to have a common id between lune and paypal, we generate an invoice id and use it as the transaction id.
//        */
//       invoiceId: string;
//     }
//   | {
//       success: false;
//       error: any;
//     };
