import type { OrderLine, OrderLineTable } from '../entities/order-line';

import { Serializer } from './serializer';

export class OrderLineSerializer extends Serializer<OrderLine, OrderLineTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['line_total', 'lineTotal'],
      ['line_subtotal', 'lineSubtotal'],
      ['unit_price', 'unitPrice'],
      ['quantity', 'quantity'],
      ['applied_discounts', 'appliedDiscounts'],
      ['variant_id', 'variantId'],
      ['order_id', 'orderId']
    ]);
  }
}
