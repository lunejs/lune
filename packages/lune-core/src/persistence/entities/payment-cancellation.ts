import type { LuneEntity, LuneTable } from './entity';

/**
 * A payment cancellation records when a payment is canceled (voided)
 */
export interface PaymentCancellation extends LuneEntity {
  /**
   * The reason why the payment was canceled
   */
  reason: string;
  /**
   * The payment that was canceled
   */
  paymentId: string;
}

export interface PaymentCancellationTable extends LuneTable {
  reason: string;
  payment_id: string;
  shop_id: string;
}
