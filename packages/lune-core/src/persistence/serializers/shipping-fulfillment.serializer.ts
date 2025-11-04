import type {
  ShippingFulfillment,
  ShippingFulfillmentTable
} from '../entities/shipping-fulfillment';

import { Serializer } from './serializer';

export class ShippingFulfillmentSerializer extends Serializer<
  ShippingFulfillment,
  ShippingFulfillmentTable
> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['tracking_code', 'trackingCode'],
      ['carrier', 'carrier'],
      ['shipped_at', 'shippedAt'],
      ['delivered_at', 'deliveredAt'],
      ['fulfillment_id', 'fulfillmentId']
    ]);
  }
}
