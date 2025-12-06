import type { Payment, PaymentTable } from '../entities/payment';

import { Serializer } from './serializer';

export class PaymentSerializer extends Serializer<Payment, PaymentTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['transaction_id', 'transactionId'],
      ['amount', 'amount'],
      ['method', 'method'],
      ['state', 'state'],
      ['payment_method_id', 'paymentMethodId'],
      ['order_id', 'orderId']
    ]);
  }
}
