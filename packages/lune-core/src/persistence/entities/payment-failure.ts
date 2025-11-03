import type { LuneEntity, LuneTable } from './entity';

/**
 * A payment failure records the reason why a payment attempt failed
 */
export interface PaymentFailure extends LuneEntity {
  /**
   * The reason why the payment failed
   */
  reason: string;
  /**
   * The payment that failed
   */
  paymentId: string;
}

export interface PaymentFailureTable extends LuneTable {
  reason: string;
  payment_id: string;
  shop_id: string;
}
