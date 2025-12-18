import type { Transaction } from '@/persistence/connection/connection';
import type {
  OrderCancellation,
  OrderCancellationTable
} from '@/persistence/entities/order-cancellation';
import { OrderCancellationSerializer } from '@/persistence/serializers/order-cancellation.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class OrderCancellationRepository extends Repository<
  OrderCancellation,
  OrderCancellationTable
> {
  constructor(trx: Transaction) {
    super(Tables.OrderCancellation, trx, new OrderCancellationSerializer());
  }
}
