import type { PaymentFailure, PaymentFailureTable } from '../entities/payment-failure';

import { Serializer } from './serializer';

export class PaymentFailureSerializer extends Serializer<PaymentFailure, PaymentFailureTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['reason', 'reason'],
      ['payment_id', 'paymentId']
    ]);
  }
}
