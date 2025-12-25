import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type {
  CustomObjectEntry,
  CustomObjectEntryTable
} from '@/persistence/entities/custom-object-entry';
import { CustomObjectEntrySerializer } from '@/persistence/serializers/custom-object-entry.serializer';
import { Tables } from '@/persistence/tables';

export function createCustomObjectDefinitionEntriesLoader(trx: Transaction) {
  return new DataLoader<string, CustomObjectEntry[]>(async customObjectDefinitionIds => {
    const rows = await trx
      .from(Tables.CustomObjectEntry)
      .select('*')
      .whereIn('definition_id', customObjectDefinitionIds)
      .orderBy('created_at', 'asc');

    const serializer = new CustomObjectEntrySerializer();
    const byDefinitionId = new Map<string, CustomObjectEntry[]>();
    for (const id of customObjectDefinitionIds) byDefinitionId.set(id, []);

    for (const row of rows as CustomObjectEntryTable[]) {
      const entry = serializer.deserialize(row) as CustomObjectEntry;
      byDefinitionId.get(row.definition_id)?.push(entry);
    }

    return (customObjectDefinitionIds as string[]).map(id => byDefinitionId.get(id) ?? []);
  });
}
