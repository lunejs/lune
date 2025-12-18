import type { Transaction } from '@/persistence/connection/connection';
import type { OrderLine, OrderLineTable } from '@/persistence/entities/order-line';
import { OrderLineSerializer } from '@/persistence/serializers/order_line.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class OrderLineRepository extends Repository<OrderLine, OrderLineTable> {
  constructor(trx: Transaction) {
    super(Tables.OrderLine, trx, new OrderLineSerializer());
  }
}
