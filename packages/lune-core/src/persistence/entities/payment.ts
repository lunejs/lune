import type { ID, LuneEntity, LuneTable } from './entity';

export enum PaymentState {
  /**
   * The payment record exists, but there is no evidence of it yet.
   */
  Pending = 'PENDING',
  /**
   * Evidence of the payment has been submitted but not yet verified.
   */
  Submitted = 'SUBMITTED',
  /**
   * Funds are reserved in the customer's account but have not been transferred yet.
   */
  Authorized = 'AUTHORIZED',
  /**
   * Funds have been successfully transferred.
   */
  Captured = 'CAPTURED',
  /**
   * The payment failed during processing by the provider.
   */
  Failed = 'FAILED',
  /**
   * The payment was manually rejected by an administrator.
   */
  Rejected = 'REJECTED',
  /**
   * The payment was canceled because the order could not be fulfilled or was voided before completion.
   */
  Canceled = 'CANCELED'
}

/**
 * A payment is a transaction between a customer and a shop, is assigned to an order
 */
export interface Payment extends LuneEntity {
  /**
   * The transaction ID from the payment provider (nullable if not processed yet)
   */
  transactionId?: string | null;
  /**
   * The total amount of the payment
   */
  amount: number;
  /**
   * The payment method used (e.g., 'stripe', 'paypal')
   */
  method: string;
  /**
   * Payment's state
   */
  state: PaymentState;

  /**
   * Payment method used for this payment
   */
  paymentMethodId: ID;
  /**
   * Order this payment belongs to
   */
  orderId: ID;
}

export interface PaymentTable extends LuneTable {
  transaction_id?: string | null;
  amount: number;
  method: string;
  state: PaymentState;
  payment_method_id: ID;
  order_id: ID;
  shop_id: string;
}
