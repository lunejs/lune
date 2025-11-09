import type { ExecutionContext } from '@/api/shared/context/types';
import type { Order } from '@/persistence/entities/order';
import type { PaymentState } from '@/persistence/entities/payment';

export interface PaymentHandler {
  /**
   * @description
   * This is used to display the provider name to the administrator.
   * The name is not arbitrary, it's up to you to choose a name that makes sense for your provider.
   *
   * @example
   * ```ts
   * name: 'Stripe'
   * ```
   */
  name: string;

  /**
   * @description
   * This is used to identify the provider and should be unique. it's mainly used in admin ui but also it can be used in the storefront,
   * for example, when displaying the payment methods to the customer in the checkout page you may want to know which provider is used by every payment method,
   * so you can display the provider logo, or know which provider sdk to load, etc.
   *
   * @example
   * ```ts
   * code: 'stripe'
   * ```
   *
   * @waring this code is send to your storefront.
   */
  code: string;

  /**
   * @description
   * This method is called when the addPaymentToOrder mutation is called.
   * This method is responsible for creating payment for the given order.
   */
  createPayment(
    order: Order,
    totalAmount: number,
    ctx: ExecutionContext
  ): Promise<CreatePaymentResult>;
}

export type CreatePaymentResult =
  | {
      /**
       * @description
       * The total amount of the transaction, this is the amount that should be authorized
       */
      amount: number;
      /**
       * @description
       * A created payment is a payment that has been created but the funds are not yet transferred, this is useful for payment methods like bank transfer.
       * To make the payment authorized you should call the authorizePayment method
       */
      status: PaymentState.Pending | PaymentState.Submitted | PaymentState.Authorized;
    }
  | {
      /**
       * @description
       * The transaction id of the payment, this will show in the order payment, this id should be the id that identifies the payment in your payment provider
       */
      transactionId: string;
      /**
       * @description
       * The total amount of the transaction, this is the amount that will show in the order payment
       */
      amount: number;
      /**
       * @description
       * An authorized payment is a payment that has been authorized and the funds are transferred, this is useful for payment methods like credit card.
       */
      status: PaymentState.Captured;
    }
  | {
      /**
       * @description
       * A declined payment is a payment that has not been completed successfully because of a provider error o a internal error of the handler
       */
      status: PaymentState.Failed;
      /**
       * @description
       * The error message that will be displayed in the api
       * ```json
       * apiErrors: [
       *   {
       *     code: 'PAYMENT_DECLINED',
       *     message: 'error from payment.error'
       *   }
       * ]
       * ```
       */
      error: string;
    };
