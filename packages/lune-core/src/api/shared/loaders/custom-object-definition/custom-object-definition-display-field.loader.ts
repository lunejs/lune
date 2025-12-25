import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type {
  CustomFieldDefinition,
  CustomFieldDefinitionTable
} from '@/persistence/entities/custom-field-definition';
import { CustomFieldDefinitionSerializer } from '@/persistence/serializers/custom-field-definition.serializer';
import { Tables } from '@/persistence/tables';

export function createCustomObjectDefinitionDisplayFieldLoader(trx: Transaction) {
  return new DataLoader<string, CustomFieldDefinition | null>(async fieldIds => {
    const nonNullIds = fieldIds.filter((id): id is string => id !== null);

    if (nonNullIds.length === 0) {
      return fieldIds.map(() => null);
    }

    const rows = await trx<CustomFieldDefinitionTable>(Tables.CustomFieldDefinition)
      .whereIn('id', nonNullIds)
      .select('*');

    const serializer = new CustomFieldDefinitionSerializer();
    const map = new Map(rows.map(r => [r.id, serializer.deserialize(r) as CustomFieldDefinition]));

    return fieldIds.map(id => (id ? (map.get(id) ?? null) : null));
  });
}
