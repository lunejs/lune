import type { CreateOrderRequestBody } from '@paypal/paypal-js';
import { isAxiosError } from 'axios';
import { customAlphabet } from 'nanoid';

import { LuneLogger, LunePrice } from '@lune/common';
import type { ExecutionContext, ID, OrderRepository } from '@lune/core';

import type { PayPal } from '../adapters/paypal';
import type { PaypalCapturePaymentResponse, PaypalErrorResponse } from '../adapters/paypal.types';

import { OrderNotFoundError, PaypalRequestError } from './paypal.errors';

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export class PayPalService {
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
              description: line.variant.optionValues?.map(opv => opv.name ?? '').join(', ')
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
                  value: String(LunePrice.toDollar(order.deliveryMethod?.total ?? 0))
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
  async capturePayment(paypalOrderId: string) {
    try {
      const data = await this.paypal.capturePayment(paypalOrderId);
      const orderDetails = await this.paypal.getOrderDetails(paypalOrderId);

      return {
        data,
        invoiceId: orderDetails.purchase_units?.[0].invoice_id ?? ''
      };
    } catch (error) {
      if (isAxiosError(error)) {
        const paypalError: PaypalErrorResponse = error.response?.data;

        LuneLogger.error(paypalError);
        return new PaypalRequestError(paypalError.message);
      }

      LuneLogger.error(error);
      return new PaypalRequestError('Could not capture payment');
    }
  }

  /**
   * @description
   * Generates an invoice id for the paypal order. This is needed to have a common identifier between lune and paypal.
   */
  private generateInvoiceId() {
    const id = customAlphabet(alphabet, 16)();

    return `PPAL-${id}`;
  }
}

export type CapturePaymentResult = {
  invoiceId: string;
  data: PaypalCapturePaymentResponse;
};
