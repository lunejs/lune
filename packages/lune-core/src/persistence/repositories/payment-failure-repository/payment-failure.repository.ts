import type { Transaction } from '@/persistence/connection';
import type { PaymentFailure, PaymentFailureTable } from '@/persistence/entities/payment-failure';
import { PaymentFailureSerializer } from '@/persistence/serializers/payment-failure.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class PaymentFailureRepository extends Repository<PaymentFailure, PaymentFailureTable> {
  constructor(trx: Transaction) {
    super(Tables.PaymentFailure, trx, new PaymentFailureSerializer());
  }
}
