import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection';
import type { ShippingMethod, ShippingMethodTable } from '@/persistence/entities/shipping-method';
import { ShippingMethodSerializer } from '@/persistence/serializers/shipping-method.serializer';
import { Tables } from '@/persistence/tables';

export function createZoneShippingMethodsLoader(trx: Transaction) {
  const shippingMethodSerializer = new ShippingMethodSerializer();

  return new DataLoader<string, ShippingMethod[]>(async zoneIds => {
    const ids = zoneIds as string[];

    const rows = await trx<ShippingMethodTable>(Tables.ShippingMethod)
      .whereIn('zone_id', ids)
      .whereNull('deleted_at')
      .orderBy('created_at', 'asc');

    const byId = new Map<string, ShippingMethod[]>();
    for (const id of ids) byId.set(id, []);

    for (const r of rows) {
      byId.get(r.zone_id)?.push(shippingMethodSerializer.deserialize(r) as ShippingMethod);
    }

    return ids.map(id => byId.get(id) ?? []);
  });
}
