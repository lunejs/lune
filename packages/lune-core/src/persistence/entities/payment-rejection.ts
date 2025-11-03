import type { LuneEntity, LuneTable } from './entity';

/**
 * A payment rejection records when an admin manually rejects a payment (typically for bank transfers or submitted proofs)
 */
export interface PaymentRejection extends LuneEntity {
  /**
   * The reason why the payment was rejected
   */
  reason: string;
  /**
   * The payment that was rejected
   */
  paymentId: string;
}

export interface PaymentRejectionTable extends LuneTable {
  reason: string;
  payment_id: string;
  shop_id: string;
}
