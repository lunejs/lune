import type { Transaction } from '@/persistence/connection/connection';
import type { CollectionProductTable } from '@/persistence/entities/collection-product';
import type { Product, ProductTable } from '@/persistence/entities/product';
import { ProductFilter } from '@/persistence/filters/product.filter';
import { ProductSerializer } from '@/persistence/serializers/product.serializer';
import { Tables } from '@/persistence/tables';

import type { CollectionProductsArgs } from '../../types/graphql';
import { loaderFactory } from '../loader-factory';

export function createCollectionProductsLoader(trx: Transaction) {
  const serializer = new ProductSerializer();

  return loaderFactory<Product, CollectionProductsArgs['input']>({
    async getItemsFn(keyIds, keyArgs) {
      const itemsQuery = trx
        .from({ cp: Tables.CollectionProduct })
        .innerJoin({ p: Tables.Product }, 'p.id', 'cp.product_id')
        .select('cp.collection_id', trx.ref('p.*'))
        .whereIn('cp.collection_id', keyIds);

      const rows = (await new ProductFilter(itemsQuery, 'p')
        .applyFilters(keyArgs?.filters ?? {})
        .applySort(keyArgs?.sort ?? {})
        .applyPagination(keyArgs ?? {})
        .build()) as (ProductTable & CollectionProductTable)[];

      return rows.map(r => ({
        keyId: r.collection_id,
        item: serializer.deserialize(r) as Product
      }));
    },
    async getCountsFn(keyIds, keyArgs) {
      const countQuery = trx
        .from({ cp: Tables.CollectionProduct })
        .innerJoin({ p: Tables.Product }, 'p.id', 'cp.product_id')
        .select('cp.collection_id')
        .count('* as total')
        .whereIn('cp.collection_id', keyIds)
        .groupBy('cp.collection_id');

      const countRows = (await new ProductFilter(countQuery, 'p')
        .applyFilters(keyArgs?.filters ?? {})
        .build()) as unknown as { collection_id: string; total: number }[];

      return countRows.map(r => ({ keyId: r.collection_id, total: r.total }));
    }
  });
}
