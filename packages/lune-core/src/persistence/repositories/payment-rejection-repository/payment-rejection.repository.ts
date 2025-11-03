import type { Transaction } from '@/persistence/connection';
import type {
  PaymentRejection,
  PaymentRejectionTable
} from '@/persistence/entities/payment-rejection';
import { PaymentRejectionSerializer } from '@/persistence/serializers/payment-rejection.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class PaymentRejectionRepository extends Repository<
  PaymentRejection,
  PaymentRejectionTable
> {
  constructor(trx: Transaction) {
    super(Tables.PaymentRejection, trx, new PaymentRejectionSerializer());
  }
}
