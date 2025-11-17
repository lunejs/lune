import type { Order, OrderTable } from '../entities/order';

import { Serializer } from './serializer';

export class OrderSerializer extends Serializer<Order, OrderTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['code', 'code'],
      ['state', 'state'],
      ['total', 'total'],
      ['subtotal', 'subtotal'],
      ['total_quantity', 'totalQuantity'],
      ['applied_discounts', 'appliedDiscounts'],
      ['placed_at', 'placedAt'],
      ['completed_at', 'completedAt'],
      ['shipping_address', 'shippingAddress'],
      ['customer_id', 'customerId']
    ]);
  }
}
