import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection';
import type { OrderLine, OrderLineTable } from '@/persistence/entities/order-line';
import { OrderLineSerializer } from '@/persistence/serializers/order_line.serializer';
import { Tables } from '@/persistence/tables';

export function createOrderLineLoader(trx: Transaction) {
  return new DataLoader<string, OrderLine[]>(async orderIds => {
    const rows: OrderLineTable[] = await trx(Tables.OrderLine)
      .whereIn('order_id', orderIds)
      .orderBy('created_at', 'asc');

    const serializer = new OrderLineSerializer();

    const byOrderId = new Map<string, OrderLine[]>();
    for (const id of orderIds) byOrderId.set(id, []);

    for (const r of rows) {
      const { order_id, ...lineCols } = r;
      const orderLine = serializer.deserialize(lineCols) as OrderLine;
      byOrderId.get(order_id)?.push(orderLine);
    }

    return (orderIds as string[]).map(id => byOrderId.get(id) ?? []);
  });
}
