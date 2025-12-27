import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type { Fulfillment, FulfillmentTable } from '@/persistence/entities/fulfillment';
import { FulfillmentSerializer } from '@/persistence/serializers/fulfillment.serializer';
import { Tables } from '@/persistence/tables';

export function createOrderFulfillmentsLoader(trx: Transaction) {
  return new DataLoader<string, Fulfillment[]>(async orderIds => {
    const rows: FulfillmentTable[] = await trx(Tables.Fulfillment)
      .whereIn('order_id', orderIds)
      .orderBy('created_at', 'asc');

    const serializer = new FulfillmentSerializer();

    const byOrderId = new Map<string, Fulfillment[]>();
    for (const id of orderIds) byOrderId.set(id, []);

    for (const r of rows) {
      const fulfillment = serializer.deserialize(r) as Fulfillment;
      byOrderId.get(r.order_id)?.push(fulfillment);
    }

    return (orderIds as string[]).map(id => byOrderId.get(id) ?? []);
  });
}
