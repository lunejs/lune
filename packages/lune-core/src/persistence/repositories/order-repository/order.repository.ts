import type { Transaction } from '@/persistence/connection';
import { type Order, OrderState, type OrderTable } from '@/persistence/entities/order';
import { OrderSerializer } from '@/persistence/serializers/order.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class OrderRepository extends Repository<Order, OrderTable> {
  constructor(trx: Transaction) {
    super(Tables.Order, trx, new OrderSerializer());
  }

  async countPlaced(): Promise<number> {
    const [{ count }] = await this.trx(Tables.Order)
      .whereNot('state', OrderState.Modifying)
      .count('* as count');

    return Number(count);
  }
}
