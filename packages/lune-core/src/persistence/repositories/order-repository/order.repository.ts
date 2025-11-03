import type { Transaction } from '@/persistence/connection';
import type { Order, OrderTable } from '@/persistence/entities/order';
import { OrderSerializer } from '@/persistence/serializers/order.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class OrderRepository extends Repository<Order, OrderTable> {
  constructor(trx: Transaction) {
    super(Tables.Orders, trx, new OrderSerializer());
  }
}
