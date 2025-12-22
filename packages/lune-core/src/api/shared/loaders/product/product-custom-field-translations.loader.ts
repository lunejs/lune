import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type { ProductCustomFieldTranslationTable } from '@/persistence/entities/product-custom-field-translation';
import { ProductCustomFieldTranslationSerializer } from '@/persistence/serializers/product-custom-field-translation.serializer';
import { Tables } from '@/persistence/tables';

import type { ProductCustomFieldTranslation } from '../../types/graphql';

export function createProductCustomFieldTranslationsLoader(trx: Transaction) {
  return new DataLoader<string, ProductCustomFieldTranslation[]>(async fieldIds => {
    const rows: ProductCustomFieldTranslationTable[] =
      await trx<ProductCustomFieldTranslationTable>(Tables.ProductCustomFieldTranslation)
        .whereIn('field_id', fieldIds)
        .orderBy('created_at', 'asc');

    const serializer = new ProductCustomFieldTranslationSerializer();

    const byFieldId = new Map<string, ProductCustomFieldTranslation[]>();
    for (const id of fieldIds) byFieldId.set(id, []);

    for (const r of rows) {
      const { field_id, ...translationCols } = r;
      const translation = serializer.deserialize(
        translationCols
      ) as unknown as ProductCustomFieldTranslation;
      byFieldId.get(field_id)?.push(translation);
    }

    return (fieldIds as string[]).map(id => byFieldId.get(id) ?? []);
  });
}
