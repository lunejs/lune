import type { Transaction } from '@/persistence/connection/connection';
import type {
  PaymentCancellation,
  PaymentCancellationTable
} from '@/persistence/entities/payment-cancellation';
import { PaymentCancellationSerializer } from '@/persistence/serializers/payment-cancellation.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class PaymentCancellationRepository extends Repository<
  PaymentCancellation,
  PaymentCancellationTable
> {
  constructor(trx: Transaction) {
    super(Tables.PaymentCancellation, trx, new PaymentCancellationSerializer());
  }
}
