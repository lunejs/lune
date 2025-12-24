import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type {
  CustomFieldDefinition,
  CustomFieldDefinitionTable
} from '@/persistence/entities/custom-field-definition';
import { CustomFieldDefinitionSerializer } from '@/persistence/serializers/custom-field-definition.serializer';
import { Tables } from '@/persistence/tables';

export function createCustomObjectDefinitionFieldsLoader(trx: Transaction) {
  return new DataLoader<string, CustomFieldDefinition[]>(async customObjectDefinitionIds => {
    const rows = await trx
      .from(Tables.CustomFieldDefinition)
      .select('*')
      .whereIn('custom_object_definition_id', customObjectDefinitionIds)
      .orderBy([
        { column: 'order', order: 'asc' },
        { column: 'created_at', order: 'asc' }
      ]);

    const serializer = new CustomFieldDefinitionSerializer();
    const byCustomObjectDefinitionId = new Map<string, CustomFieldDefinition[]>();
    for (const id of customObjectDefinitionIds) byCustomObjectDefinitionId.set(id, []);

    for (const row of rows as CustomFieldDefinitionTable[]) {
      const definition = serializer.deserialize(row) as CustomFieldDefinition;
      byCustomObjectDefinitionId.get(row.custom_object_definition_id as string)?.push(definition);
    }

    return (customObjectDefinitionIds as string[]).map(
      id => byCustomObjectDefinitionId.get(id) ?? []
    );
  });
}
