import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type {
  CustomFieldDefinition,
  CustomFieldDefinitionTable
} from '@/persistence/entities/custom-field-definition';
import type { CustomObjectEntryValueTable } from '@/persistence/entities/custom-object-entry-value';
import { CustomFieldDefinitionSerializer } from '@/persistence/serializers/custom-field-definition.serializer';
import { Tables } from '@/persistence/tables';

export type CustomObjectFieldWithDefinition = {
  id: string;
  value: unknown;
  definition: CustomFieldDefinition;
};

export type CustomObjectFieldsLoaderKey = {
  entryId: string;
  keys: string[];
};

function getCacheKey(key: CustomObjectFieldsLoaderKey): string {
  return `${key.entryId}:${JSON.stringify(key.keys)}`;
}

export function createCustomObjectFieldsLoader(trx: Transaction) {
  return new DataLoader<CustomObjectFieldsLoaderKey, CustomObjectFieldWithDefinition[], string>(
    async loaderKeys => {
      const entryIds = loaderKeys.map(k => k.entryId);
      const filterKeys = loaderKeys[0]?.keys;

      const query = trx
        .from({ e: Tables.CustomObjectEntryValue })
        .innerJoin({ d: Tables.CustomFieldDefinition }, 'd.id', 'e.field_id')
        .select('e.entry_id', 'e.value', 'e.id as entry_value_id', 'd.*')
        .whereIn('e.entry_id', entryIds)
        .orderBy([
          { column: 'd.order', order: 'asc' },
          { column: 'd.created_at', order: 'asc' }
        ]);

      if (filterKeys?.length) {
        query.whereIn('d.key', filterKeys);
      }

      type Row = Pick<CustomObjectEntryValueTable, 'entry_id' | 'value'> &
        CustomFieldDefinitionTable & { entry_value_id: string };

      const rows = (await query) as Row[];
      const serializer = new CustomFieldDefinitionSerializer();

      const byEntryId = new Map<string, CustomObjectFieldWithDefinition[]>();
      for (const id of entryIds) {
        byEntryId.set(id, []);
      }

      for (const row of rows) {
        const { entry_id, value, entry_value_id, ...definitionCols } = row;
        const definition = serializer.deserialize(definitionCols as CustomFieldDefinitionTable);

        byEntryId.get(entry_id)?.push({
          id: entry_value_id,
          value,
          definition: definition as CustomFieldDefinition
        });
      }

      return loaderKeys.map(key => byEntryId.get(key.entryId) ?? []);
    },
    { cacheKeyFn: getCacheKey }
  );
}
