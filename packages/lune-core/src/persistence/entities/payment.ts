import type { LuneEntity, LuneTable } from './entity';

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
}

export interface PaymentTable extends LuneTable {
  transaction_id?: string | null;
  amount: number;
  method: string;
  shop_id: string;
}
