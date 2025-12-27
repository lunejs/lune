import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type {
  FulfillmentLine,
  FulfillmentLineTable
} from '@/persistence/entities/fulfillment-line';
import { FulfillmentLineSerializer } from '@/persistence/serializers/fulfillment-line.serializer';
import { Tables } from '@/persistence/tables';

export function createFulfillmentLinesLoader(trx: Transaction) {
  return new DataLoader<string, FulfillmentLine[]>(async fulfillmentIds => {
    const rows: FulfillmentLineTable[] = await trx(Tables.FulfillmentLine)
      .whereIn('fulfillment_id', fulfillmentIds)
      .orderBy('created_at', 'asc');

    const serializer = new FulfillmentLineSerializer();

    const byFulfillmentId = new Map<string, FulfillmentLine[]>();
    for (const id of fulfillmentIds) byFulfillmentId.set(id, []);

    for (const r of rows) {
      const fulfillmentLine = serializer.deserialize(r) as FulfillmentLine;
      byFulfillmentId.get(r.fulfillment_id)?.push(fulfillmentLine);
    }

    return (fulfillmentIds as string[]).map(id => byFulfillmentId.get(id) ?? []);
  });
}
