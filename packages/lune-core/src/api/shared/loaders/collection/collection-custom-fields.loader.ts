import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type { CollectionCustomFieldTable } from '@/persistence/entities/collection-custom-field';
import type {
  CustomFieldDefinition,
  CustomFieldDefinitionTable
} from '@/persistence/entities/custom-field-definition';
import { CustomFieldDefinitionSerializer } from '@/persistence/serializers/custom-field-definition.serializer';
import { Tables } from '@/persistence/tables';

export interface CollectionCustomFieldWithDefinition {
  id: string;
  value: unknown;
  definition: CustomFieldDefinition;
}

export function createCollectionCustomFieldsLoader(trx: Transaction) {
  return new DataLoader<string, CollectionCustomFieldWithDefinition[]>(async collectionIds => {
    const rows = await trx
      .from({ ccf: Tables.CollectionCustomField })
      .innerJoin({ cfd: Tables.CustomFieldDefinition }, 'cfd.id', 'ccf.definition_id')
      .select('ccf.collection_id', 'ccf.value', 'ccf.id as collection_custom_field_id', 'cfd.*')
      .whereIn('ccf.collection_id', collectionIds)
      .orderBy('cfd.order', 'asc');

    type Row = Pick<CollectionCustomFieldTable, 'collection_id' | 'value'> &
      CustomFieldDefinitionTable & { collection_custom_field_id: string };

    const serializer = new CustomFieldDefinitionSerializer();
    const byCollectionId = new Map<string, CollectionCustomFieldWithDefinition[]>();
    for (const id of collectionIds) byCollectionId.set(id, []);

    for (const row of rows as Row[]) {
      const { collection_id, value, collection_custom_field_id, ...definitionCols } = row;
      const definition = serializer.deserialize(definitionCols as CustomFieldDefinitionTable);

      byCollectionId.get(collection_id)?.push({
        id: collection_custom_field_id,
        value,
        definition: definition as CustomFieldDefinition
      });
    }

    return (collectionIds as string[]).map(id => byCollectionId.get(id) ?? []);
  });
}
