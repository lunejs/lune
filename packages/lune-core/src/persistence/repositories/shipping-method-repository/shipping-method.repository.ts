import type { Transaction } from '@/persistence/connection';
import type { ID } from '@/persistence/entities/entity';
import type { ShippingMethod, ShippingMethodTable } from '@/persistence/entities/shipping-method';
import { ShippingMethodSerializer } from '@/persistence/serializers/shipping-method.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class ShippingMethodRepository extends Repository<ShippingMethod, ShippingMethodTable> {
  constructor(trx: Transaction) {
    super(Tables.ShippingMethod, trx, new ShippingMethodSerializer());
  }

  async findEnabledByIdAndState(id: ID, stateId: ID): Promise<ShippingMethod | null> {
    const result = await this.trx(Tables.ShippingMethod)
      .where({
        'shipping_method.id': id,
        'shipping_method.enabled': true
      })
      .select('shipping_method.*')
      .join('zone', 'shipping_method.zone_id', 'zone.id')
      .join('zone_state', 'zone.id', 'zone_state.zone_id')
      .join('state', 'zone_state.state_id', 'state.id')
      .where('state.id', stateId)
      .first();

    return result ? (this.serializer.deserialize(result) as ShippingMethod) : null;
  }

  async findEnabledByState(stateId: ID): Promise<ShippingMethod[]> {
    const results = await this.trx(Tables.ShippingMethod)
      .where('shipping_method.enabled', true)
      .join('zone', 'shipping_method.zone_id', 'zone.id')
      .join('zone_state', 'zone.id', 'zone_state.zone_id')
      .where('zone_state.state_id', stateId)
      .select('shipping_method.*')
      .orderBy('shipping_method.created_at', 'desc');

    return results.map(result => this.serializer.deserialize(result) as ShippingMethod);
  }
}
