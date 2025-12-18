import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type { Location, LocationTable } from '@/persistence/entities/location';
import { LocationSerializer } from '@/persistence/serializers/location.serializer';
import { Tables } from '@/persistence/tables';

export function createFulfillmentLocationLoader(trx: Transaction) {
  return new DataLoader<string, Location | null>(async locationIds => {
    const serializer = new LocationSerializer();
    const rows = await trx<LocationTable>(Tables.Location).whereIn('id', locationIds).select('*');

    const map = new Map(rows.map(r => [r.id, serializer.deserialize(r) as Location]));
    return locationIds.map(id => map.get(id) ?? null);
  });
}
