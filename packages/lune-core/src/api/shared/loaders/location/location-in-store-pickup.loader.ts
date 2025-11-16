import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection';
import type { InStorePickup, InStorePickupTable } from '@/persistence/entities/in-store-pickup';
import { InStorePickupSerializer } from '@/persistence/serializers/in-store-pickup.serializer';
import { Tables } from '@/persistence/tables';

export function createLocationInStorePickupLoader(trx: Transaction) {
  return new DataLoader<string, InStorePickup>(async locationIds => {
    const serializer = new InStorePickupSerializer();
    const rows = await trx<InStorePickupTable>(Tables.InStorePickup)
      .whereIn('location_id', locationIds)
      .select('*');

    const map = new Map(rows.map(r => [r.location_id, serializer.deserialize(r) as InStorePickup]));
    return locationIds.map(id => map.get(id) as InStorePickup);
  });
}
