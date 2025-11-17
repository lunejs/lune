import type { OrderDiscount, OrderDiscountTable } from '../entities/order-discount';

import { Serializer } from './serializer';

export class OrderDiscountSerializer extends Serializer<OrderDiscount, OrderDiscountTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['amount', 'amount'],
      ['discount_id', 'discountId'],
      ['order_id', 'orderId']
    ]);
  }
}
