import type {
  PaymentCancellation,
  PaymentCancellationTable
} from '../entities/payment-cancellation';

import { Serializer } from './serializer';

export class PaymentCancellationSerializer extends Serializer<
  PaymentCancellation,
  PaymentCancellationTable
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
