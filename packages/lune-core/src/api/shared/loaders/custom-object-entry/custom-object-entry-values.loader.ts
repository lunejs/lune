import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type {
  CustomObjectEntryValue,
  CustomObjectEntryValueTable
} from '@/persistence/entities/custom-object-entry-value';
import { CustomObjectEntryValueSerializer } from '@/persistence/serializers/custom-object-entry-value.serializer';
import { Tables } from '@/persistence/tables';

export function createCustomObjectEntryValuesLoader(trx: Transaction) {
  return new DataLoader<string, CustomObjectEntryValue[]>(async entryIds => {
    const rows = await trx
      .from(Tables.CustomObjectEntryValue)
      .select('*')
      .whereIn('entry_id', entryIds)
      .orderBy('created_at', 'asc');

    const serializer = new CustomObjectEntryValueSerializer();
    const byEntryId = new Map<string, CustomObjectEntryValue[]>();
    for (const id of entryIds) byEntryId.set(id, []);

    for (const row of rows as CustomObjectEntryValueTable[]) {
      const value = serializer.deserialize(row) as CustomObjectEntryValue;
      byEntryId.get(row.entry_id)?.push(value);
    }

    return (entryIds as string[]).map(id => byEntryId.get(id) ?? []);
  });
}
