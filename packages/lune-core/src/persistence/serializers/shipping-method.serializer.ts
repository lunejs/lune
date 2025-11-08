import type { ShippingMethod, ShippingMethodTable } from '../entities/shipping-method';

import { Serializer } from './serializer';

export class ShippingMethodSerializer extends Serializer<ShippingMethod, ShippingMethodTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['name', 'name'],
      ['handler', 'handler'],
      ['enabled', 'enabled'],
      ['zone_id', 'zoneId']
    ]);
  }
}
