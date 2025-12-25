import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type {
  CustomFieldDefinition,
  CustomFieldDefinitionTable
} from '@/persistence/entities/custom-field-definition';
import { CustomFieldDefinitionSerializer } from '@/persistence/serializers/custom-field-definition.serializer';
import { Tables } from '@/persistence/tables';

export function createCustomObjectEntryValueFieldLoader(trx: Transaction) {
  return new DataLoader<string, CustomFieldDefinition | null>(async fieldIds => {
    const rows = await trx<CustomFieldDefinitionTable>(Tables.CustomFieldDefinition)
      .whereIn('id', fieldIds)
      .select('*');

    const serializer = new CustomFieldDefinitionSerializer();
    const map = new Map(
      rows.map(r => [r.id, serializer.deserialize(r) as CustomFieldDefinition])
    );

    return fieldIds.map(id => map.get(id) ?? null);
  });
}
