import type { Transaction } from '@/persistence/connection';
import type { PaymentMethod, PaymentMethodTable } from '@/persistence/entities/payment-method';
import { PaymentMethodSerializer } from '@/persistence/serializers/payment-method.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class PaymentMethodRepository extends Repository<PaymentMethod, PaymentMethodTable> {
  constructor(trx: Transaction) {
    super(Tables.PaymentMethod, trx, new PaymentMethodSerializer());
  }
}
