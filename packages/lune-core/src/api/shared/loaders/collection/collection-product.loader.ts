import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection';
import type { CollectionProductTable } from '@/persistence/entities/collection-product';
import type { Product, ProductTable } from '@/persistence/entities/product';
import { ProductFilter } from '@/persistence/filters/product.filter';
import { ProductSerializer } from '@/persistence/serializers/product.serializer';
import { Tables } from '@/persistence/tables';

import type { CollectionProductsArgs } from '../../types/graphql';

export function createCollectionProductsLoader(
  trx: Transaction,
  variables: CollectionProductsArgs | undefined
) {
  const input = variables?.input;
  const productSerializer = new ProductSerializer();

  return new DataLoader<string, Product[]>(async collectionIds => {
    const ids = collectionIds as string[];

    const query = trx
      .from({ cp: Tables.CollectionProduct })
      .innerJoin({ p: Tables.Product }, 'p.id', 'cp.product_id')
      .select('cp.collection_id', trx.ref('p.*'))
      .whereIn('cp.collection_id', ids);

    new ProductFilter(query, 'p')
      .applyFilters(input?.filters ?? {})
      .applySort(input?.sort ?? {})
      .applyPagination(input ?? {});

    const rows: (ProductTable & CollectionProductTable)[] = await query;

    const byId = new Map<string, Product[]>();
    for (const id of ids) byId.set(id, []);

    for (const r of rows) {
      const { collection_id, ...productCols } = r;
      byId
        .get(collection_id)
        ?.push({ ...productSerializer.deserialize(productCols as ProductTable) } as Product);
    }

    return ids.map(id => byId.get(id) || []);
  });
}
