import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type { Option, OptionTable } from '@/persistence/entities/option';
import { OptionSerializer } from '@/persistence/serializers/option.serializer';
import { Tables } from '@/persistence/tables';

export function createProductOptionsLoader(trx: Transaction) {
  const optionSerializer = new OptionSerializer();

  return new DataLoader<string, Option[]>(async productIds => {
    const ids = productIds as string[];

    const rows: OptionTable[] = await trx
      .from({ o: Tables.Option })
      .select('o.*')
      .whereNull('o.deleted_at')
      .whereIn('o.product_id', ids)
      .orderBy([{ column: 'o.order', order: 'asc' }]);

    const byId = new Map<string, Option[]>();

    for (const id of ids) byId.set(id, []);

    for (const r of rows) {
      byId.get(r.product_id)?.push(optionSerializer.deserialize(r) as Option);
    }

    return ids.map(id => byId.get(id) as Option[]);
  });
}
