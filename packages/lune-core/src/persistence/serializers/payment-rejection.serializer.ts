import type { PaymentRejection, PaymentRejectionTable } from '../entities/payment-rejection';

import { Serializer } from './serializer';

export class PaymentRejectionSerializer extends Serializer<
  PaymentRejection,
  PaymentRejectionTable
> {
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
