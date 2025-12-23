import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type { CollectionCustomFieldTranslationTable } from '@/persistence/entities/collection-custom-field-translation';
import { CollectionCustomFieldTranslationSerializer } from '@/persistence/serializers/collection-custom-field-translation.serializer';
import { Tables } from '@/persistence/tables';

import type { CollectionCustomFieldTranslation } from '../../types/graphql';

export function createCollectionCustomFieldTranslationsLoader(trx: Transaction) {
  return new DataLoader<string, CollectionCustomFieldTranslation[]>(async fieldIds => {
    const rows: CollectionCustomFieldTranslationTable[] =
      await trx<CollectionCustomFieldTranslationTable>(Tables.CollectionCustomFieldTranslation)
        .whereIn('field_id', fieldIds)
        .orderBy('created_at', 'asc');

    const serializer = new CollectionCustomFieldTranslationSerializer();

    const byFieldId = new Map<string, CollectionCustomFieldTranslation[]>();
    for (const id of fieldIds) byFieldId.set(id, []);

    for (const r of rows) {
      const { field_id, ...translationCols } = r;
      const translation = serializer.deserialize(
        translationCols
      ) as unknown as CollectionCustomFieldTranslation;
      byFieldId.get(field_id)?.push(translation);
    }

    return (fieldIds as string[]).map(id => byFieldId.get(id) ?? []);
  });
}
