import type { Transaction } from '@/persistence/connection';
import type { Payment, PaymentTable } from '@/persistence/entities/payment';
import { PaymentSerializer } from '@/persistence/serializers/payment.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class PaymentRepository extends Repository<Payment, PaymentTable> {
  constructor(trx: Transaction) {
    super(Tables.Payment, trx, new PaymentSerializer());
  }
}
