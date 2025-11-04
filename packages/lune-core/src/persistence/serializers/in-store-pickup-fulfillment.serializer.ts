import type {
  InStorePickupFulfillment,
  InStorePickupFulfillmentTable
} from '../entities/in-store-pickup-fulfillment';

import { Serializer } from './serializer';

export class InStorePickupFulfillmentSerializer extends Serializer<
  InStorePickupFulfillment,
  InStorePickupFulfillmentTable
> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['address', 'address'],
      ['ready_at', 'readyAt'],
      ['picked_up_at', 'pickedUpAt'],
      ['fulfillment_id', 'fulfillmentId'],
      ['location_id', 'locationId']
    ]);
  }
}
