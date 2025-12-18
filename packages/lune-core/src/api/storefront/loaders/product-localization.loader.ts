import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type { Locale } from '@/persistence/entities/locale';
import type {
  ProductTranslation,
  ProductTranslationTable
} from '@/persistence/entities/product-translation';
import { ProductTranslationSerializer } from '@/persistence/serializers/product-translation.serializer';
import { Tables } from '@/persistence/tables';

export function createProductLocalizationLoader(
  trx: Transaction,
  locale: Locale | null | undefined
) {
  return new DataLoader<string, ProductTranslation | null>(async productIds => {
    if (!locale) {
      throw new Error('Locale is required to load product translations');
    }

    const productTranslationSerializer = new ProductTranslationSerializer();
    const rows = await trx<ProductTranslationTable>(Tables.ProductTranslation)
      .select('product_id', 'name', 'slug', 'description')
      .whereIn('product_id', productIds)
      .andWhere('locale', locale);

    const byId = new Map(
      rows.map(r => [
        r.product_id,
        productTranslationSerializer.deserialize(r) as ProductTranslation
      ])
    );
    return productIds.map(id => byId.get(id) ?? null);
  });
}
