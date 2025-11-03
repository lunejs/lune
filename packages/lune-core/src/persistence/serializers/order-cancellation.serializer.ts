import type { OrderCancellation, OrderCancellationTable } from '../entities/order-cancellation';

import { Serializer } from './serializer';

export class OrderCancellationSerializer extends Serializer<
  OrderCancellation,
  OrderCancellationTable
> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['reason', 'reason'],
      ['order_id', 'orderId']
    ]);
  }
}
