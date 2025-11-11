import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection';
import type { ShippingMethod, ShippingMethodTable } from '@/persistence/entities/shipping-method';
import { ShippingMethodSerializer } from '@/persistence/serializers/shipping-method.serializer';
import { Tables } from '@/persistence/tables';

export function createFulfillmentShippingMethodLoader(trx: Transaction) {
  return new DataLoader<string, ShippingMethod | null>(async shippingMethodIds => {
    const serializer = new ShippingMethodSerializer();
    const rows = await trx<ShippingMethodTable>(Tables.ShippingMethod)
      .whereIn('id', shippingMethodIds)
      .select('*');

    const map = new Map(rows.map(r => [r.id, serializer.deserialize(r) as ShippingMethod]));
    return shippingMethodIds.map(id => map.get(id) ?? null);
  });
}