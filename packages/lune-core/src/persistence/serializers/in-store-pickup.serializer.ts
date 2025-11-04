import type { InStorePickup, InStorePickupTable } from '../entities/in-store-pickup';

import { Serializer } from './serializer';

export class InStorePickupSerializer extends Serializer<InStorePickup, InStorePickupTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['isAvailable', 'isAvailable'],
      ['instructions', 'instructions'],
      ['location_id', 'locationId']
    ]);
  }
}
