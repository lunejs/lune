import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type { DeliveryMethod, DeliveryMethodTable } from '@/persistence/entities/delivery-method';
import { DeliveryMethodSerializer } from '@/persistence/serializers/delivery-method.serializer';
import { Tables } from '@/persistence/tables';

export function createOrderDeliveryMethodsLoader(trx: Transaction) {
  return new DataLoader<string, DeliveryMethod | null>(async orderIds => {
    const rows: DeliveryMethodTable[] = await trx(Tables.DeliveryMethod)
      .whereIn('order_id', orderIds)
      .orderBy('created_at', 'asc');

    const serializer = new DeliveryMethodSerializer();

    const map = new Map(rows.map(r => [r.order_id, serializer.deserialize(r) as DeliveryMethod]));
    return orderIds.map(id => (id !== null ? (map.get(id) as DeliveryMethod) : null));
  });
}
