import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type { Fulfillment, FulfillmentTable } from '@/persistence/entities/fulfillment';
import { FulfillmentSerializer } from '@/persistence/serializers/fulfillment.serializer';
import { Tables } from '@/persistence/tables';

export function createOrderFulfillmentsLoader(trx: Transaction) {
  return new DataLoader<string, Fulfillment | null>(async orderIds => {
    const rows: FulfillmentTable[] = await trx(Tables.Fulfillment)
      .whereIn('order_id', orderIds)
      .orderBy('created_at', 'asc');

    const serializer = new FulfillmentSerializer();

    const map = new Map(rows.map(r => [r.order_id, serializer.deserialize(r) as Fulfillment]));
    return orderIds.map(id => (id !== null ? (map.get(id) as Fulfillment) : null));
  });
}
