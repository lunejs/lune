import type { Transaction } from '@/persistence/connection';
import type { ID } from '@/persistence/entities/entity';
import type { OrderDiscount, OrderDiscountTable } from '@/persistence/entities/order-discount';
import { OrderDiscountSerializer } from '@/persistence/serializers/order-discount.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class OrderDiscountRepository extends Repository<OrderDiscount, OrderDiscountTable> {
  constructor(trx: Transaction) {
    super(Tables.OrderDiscount, trx, new OrderDiscountSerializer());
  }

  async countByCustomerIdAndDiscountId(customerId: ID, discountId: ID) {
    const [result] = await this.trx
      .from(Tables.OrderDiscount)
      .join(Tables.Order, `${Tables.OrderDiscount}.order_id`, `${Tables.Order}.id`)
      .where({
        [`${Tables.OrderDiscount}.discount_id`]: discountId,
        [`${Tables.Order}.customer_id`]: customerId
      })
      .count('* as count');

    return Number(result.count);
  }
}
