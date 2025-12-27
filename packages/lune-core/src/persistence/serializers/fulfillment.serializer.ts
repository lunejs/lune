import type { Fulfillment, FulfillmentTable } from '../entities/fulfillment';

import { Serializer } from './serializer';

export class FulfillmentSerializer extends Serializer<Fulfillment, FulfillmentTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['state', 'state'],
      ['metadata', 'metadata'],
      ['order_id', 'orderId']
    ]);
  }
}
