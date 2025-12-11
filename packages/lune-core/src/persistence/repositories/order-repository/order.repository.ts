import type { OrderListInput } from '@/api/shared/types/graphql';
import type { Transaction } from '@/persistence/connection';
import { type Order, OrderState, type OrderTable } from '@/persistence/entities/order';
import { OrderFilter } from '@/persistence/filters/order.filter';
import { OrderSerializer } from '@/persistence/serializers/order.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class OrderRepository extends Repository<Order, OrderTable> {
  constructor(trx: Transaction) {
    super(Tables.Order, trx, new OrderSerializer());
  }

  async findByFilters(input: OrderListInput) {
    const query = this.q();

    const result = await new OrderFilter(query)
      .applyFilters(input.filters ?? {})
      .applyPagination(input)
      .applySort()
      .build();

    return result.map(r => this.serializer.deserialize(r) as Order);
  }

  async countByFilters(filters: OrderListInput['filters']) {
    const query = this.q();

    new OrderFilter(query).applyFilters(filters ?? {});

    const [{ count }] = await query.count({ count: '*' });

    return Number(count);
  }

  async countPlaced(): Promise<number> {
    const [{ count }] = await this.trx(Tables.Order)
      .whereNot('state', OrderState.Modifying)
      .count('* as count');

    return Number(count);
  }
}
