import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection';
import type { CollectionProductTable } from '@/persistence/entities/collection-product';
import type { Product, ProductTable } from '@/persistence/entities/product';
import { ProductSerializer } from '@/persistence/serializers/product.serializer';
import { Tables } from '@/persistence/tables';

export function createCollectionProductsLoader(trx: Transaction) {
  const productSerializer = new ProductSerializer();

  return new DataLoader<string, Product[]>(async collectionIds => {
    const ids = collectionIds as string[];

    const rows: (ProductTable & CollectionProductTable)[] = await trx
      .from({ cp: Tables.CollectionProduct })
      .innerJoin({ a: Tables.Asset }, 'a.id', 'cp.asset_id')
      .select('cp.product_id', trx.ref('a.*'))
      .whereIn('cp.product_id', ids);

    const byId = new Map<string, Product[]>();
    for (const id of ids) byId.set(id, []);

    for (const r of rows) {
      const { collection_id, ...productCols } = r;
      byId
        .get(collection_id)
        ?.push({ ...productSerializer.deserialize(productCols as ProductTable) } as Product);
    }

    return ids.map(id => byId.get(id) as Product[]);
  });
}
