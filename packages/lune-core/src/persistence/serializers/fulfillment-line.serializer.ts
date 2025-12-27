import type { FulfillmentLine, FulfillmentLineTable } from '../entities/fulfillment-line';

import { Serializer } from './serializer';

export class FulfillmentLineSerializer extends Serializer<FulfillmentLine, FulfillmentLineTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['quantity', 'quantity'],
      ['fulfillment_id', 'fulfillmentId'],
      ['order_line_id', 'orderLineId']
    ]);
  }
}
