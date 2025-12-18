import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type {
  OrderCancellation,
  OrderCancellationTable
} from '@/persistence/entities/order-cancellation';
import { OrderCancellationSerializer } from '@/persistence/serializers/order-cancellation.serializer';
import { Tables } from '@/persistence/tables';

export function createOrderCancellationLoader(trx: Transaction) {
  return new DataLoader<string, OrderCancellation | null>(async orderIds => {
    const rows: OrderCancellationTable[] = await trx(Tables.OrderCancellation)
      .whereIn('order_id', orderIds)
      .orderBy('created_at', 'asc');

    const serializer = new OrderCancellationSerializer();

    const map = new Map(
      rows.map(r => [r.order_id, serializer.deserialize(r) as OrderCancellation])
    );
    return orderIds.map(id => map.get(id) ?? null);
  });
}
