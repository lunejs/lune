import type { Transaction } from '@/persistence/connection/connection';
import type { Product } from '@/persistence/entities/product';
import { ProductSerializer } from '@/persistence/serializers/product.serializer';
import { Tables } from '@/persistence/tables';

import { referenceLoaderFactory } from '../reference-loader-factory';

export function createCustomFieldProductReferencesLoader(trx: Transaction) {
  const serializer = new ProductSerializer();

  return referenceLoaderFactory<Product>({
    async fetchByIds(ids) {
      const rows = await trx
        .from(Tables.Product)
        .whereIn('id', ids)
        .whereNull('deleted_at')
        .select('*');

      const itemsById = new Map<string, Product>();
      for (const row of rows) {
        const product = serializer.deserialize(row) as Product;
        itemsById.set(product.id, product);
      }

      return itemsById;
    }
  });
}
