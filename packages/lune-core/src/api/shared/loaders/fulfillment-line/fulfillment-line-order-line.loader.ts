import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type { OrderLine, OrderLineTable } from '@/persistence/entities/order-line';
import { OrderLineSerializer } from '@/persistence/serializers/order_line.serializer';
import { Tables } from '@/persistence/tables';

export function createFulfillmentLineOrderLineLoader(trx: Transaction) {
  return new DataLoader<string, OrderLine>(async orderLineIds => {
    const serializer = new OrderLineSerializer();
    const rows = await trx<OrderLineTable>(Tables.OrderLine)
      .whereIn('id', orderLineIds)
      .select('*');

    const map = new Map(rows.map(r => [r.id, serializer.deserialize(r) as OrderLine]));
    return orderLineIds.map(id => map.get(id) as OrderLine);
  });
}
