import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type {
  CustomObjectEntry,
  CustomObjectEntryTable
} from '@/persistence/entities/custom-object-entry';
import type { ID } from '@/persistence/entities/entity';
import { CustomObjectEntrySerializer } from '@/persistence/serializers/custom-object-entry.serializer';
import { Tables } from '@/persistence/tables';

export function createOptionValueCustomObjectEntryLoader(trx: Transaction) {
  const serializer = new CustomObjectEntrySerializer();

  return new DataLoader<string, CustomObjectEntry | null>(async entryIds => {
    const ids = entryIds as ID[];

    const rows: CustomObjectEntryTable[] = await trx<CustomObjectEntryTable>(
      Tables.CustomObjectEntry
    ).whereIn('id', ids);

    const byId = new Map<string, CustomObjectEntry>();

    for (const r of rows) {
      byId.set(r.id, serializer.deserialize(r) as CustomObjectEntry);
    }

    return ids.map(id => byId.get(id) ?? null);
  });
}
