import type { Fulfillment, FulfillmentTable } from '../entities/fulfillment';

import { Serializer } from './serializer';

export class FulfillmentSerializer extends Serializer<Fulfillment, FulfillmentTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['code', 'code'],
      ['total_quantity', 'totalQuantity'],
      ['state', 'state'],
      ['metadata', 'metadata'],
      ['type', 'type'],
      ['order_id', 'orderId']
    ]);
  }
}
