import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection';
import type { Product, ProductTable } from '@/persistence/entities/product';
import { ProductSerializer } from '@/persistence/serializers/product.serializer';
import { Tables } from '@/persistence/tables';

export function createVariantProductLoader(trx: Transaction) {
  return new DataLoader<string, Product>(async productIds => {
    const serializer = new ProductSerializer();
    const rows = await trx<ProductTable>(Tables.Product).whereIn('id', productIds).select('*');

    const map = new Map(rows.map(r => [r.id, serializer.deserialize(r) as Product]));
    return productIds.map(id => map.get(id) as Product);
  });
}
