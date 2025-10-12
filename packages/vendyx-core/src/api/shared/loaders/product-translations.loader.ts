import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection';
import type {
  ProductTranslation,
  ProductTranslationTable
} from '@/persistence/entities/product-translation';
import { ProductTranslationSerializer } from '@/persistence/serializers/product-translation.serializer';
import { Tables } from '@/persistence/tables';

export function createProductTranslationsLoader(trx: Transaction) {
  return new DataLoader<string, ProductTranslation[]>(async productIds => {
    const rows: ProductTranslationTable[] = await trx(Tables.ProductTranslation)
      .whereIn('product_id', productIds)
      .orderBy('created_at', 'asc');

    const productTranslationSerializer = new ProductTranslationSerializer();

    const byProductId = new Map<string, ProductTranslation[]>();
    for (const id of productIds) byProductId.set(id, []);

    for (const r of rows) {
      const { product_id, ...translationCols } = r;
      const translation = productTranslationSerializer.deserialize(
        translationCols as ProductTranslationTable
      ) as ProductTranslation;
      byProductId.get(product_id)?.push(translation);
    }

    return (productIds as string[]).map(id => byProductId.get(id) ?? []);
  });
}
