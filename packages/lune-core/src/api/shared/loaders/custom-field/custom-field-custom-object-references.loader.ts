import type { Transaction } from '@/persistence/connection/connection';
import type { CustomObjectEntry } from '@/persistence/entities/custom-object-entry';
import { CustomObjectEntrySerializer } from '@/persistence/serializers/custom-object-entry.serializer';
import { Tables } from '@/persistence/tables';

import { referenceLoaderFactory } from '../reference-loader-factory';

export function createCustomFieldCustomObjectReferencesLoader(trx: Transaction) {
  const serializer = new CustomObjectEntrySerializer();

  return referenceLoaderFactory<CustomObjectEntry>({
    async fetchByIds(ids) {
      const rows = await trx.from(Tables.CustomObjectEntry).whereIn('id', ids).select('*');

      const itemsById = new Map<string, CustomObjectEntry>();
      for (const row of rows) {
        const entry = serializer.deserialize(row) as CustomObjectEntry;
        itemsById.set(entry.id, entry);
      }

      return itemsById;
    }
  });
}
