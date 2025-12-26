import type {
  DeliveryMethodPickup,
  DeliveryMethodPickupTable
} from '../entities/delivery-method-pickup';

import { Serializer } from './serializer';

export class DeliveryMethodPickupSerializer extends Serializer<
  DeliveryMethodPickup,
  DeliveryMethodPickupTable
> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['address', 'address'],
      ['delivery_method_id', 'deliveryMethodId'],
      ['location_id', 'locationId']
    ]);
  }
}
