import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection';
import type { CollectionProductTable } from '@/persistence/entities/collection-product';
import type { Product, ProductTable } from '@/persistence/entities/product';
import { ProductFilter } from '@/persistence/filters/product.filter';
import { ProductSerializer } from '@/persistence/serializers/product.serializer';
import { Tables } from '@/persistence/tables';

import type { CollectionProductsArgs } from '../../types/graphql';

type CacheKeyType = string;
type ValueType = {
  items: Product[];
  total: number;
};
type KeyType = {
  collectionId: string;
  args: CollectionProductsArgs;
};

export function createCollectionProductsLoader(trx: Transaction) {
  const productSerializer = new ProductSerializer();

  return new DataLoader<KeyType, ValueType, CacheKeyType>(
    async keys => {
      const keysByArgs = new Map<string, KeyType[]>();

      for (const key of keys) {
        const argsKey = JSON.stringify(key.args.input ?? {});
        if (!keysByArgs.has(argsKey)) {
          keysByArgs.set(argsKey, []);
        }
        keysByArgs.get(argsKey)?.push(key);
      }

      const results = new Map<string, ValueType>();

      for (const keysGroup of keysByArgs.values()) {
        const collectionIds = keysGroup.map(k => k.collectionId);
        const input = keysGroup[0].args.input;

        const itemsQuery = trx
          .from({ cp: Tables.CollectionProduct })
          .innerJoin({ p: Tables.Product }, 'p.id', 'cp.product_id')
          .select('cp.collection_id', trx.ref('p.*'))
          .whereIn('cp.collection_id', collectionIds);

        const rows = (await new ProductFilter(itemsQuery, 'p')
          .applyFilters(input?.filters ?? {})
          .applySort(input?.sort ?? {})
          .applyPagination(input ?? {})
          .build()) as (ProductTable & CollectionProductTable)[];

        const countQuery = trx
          .from({ cp: Tables.CollectionProduct })
          .innerJoin({ p: Tables.Product }, 'p.id', 'cp.product_id')
          .select('cp.collection_id')
          .count('* as total')
          .whereIn('cp.collection_id', collectionIds)
          .groupBy('cp.collection_id');

        const countRows = (await new ProductFilter(countQuery, 'p')
          .applyFilters(input?.filters ?? {})
          .build()) as unknown as { collection_id: string; total: number }[];

        const totalsByCollectionId = new Map<string, number>();
        for (const row of countRows) {
          totalsByCollectionId.set(row.collection_id, Number(row.total));
        }

        for (const key of keysGroup) {
          const cacheKey = `${key.collectionId}:${JSON.stringify(key.args.input ?? {})}`;
          const total = totalsByCollectionId.get(key.collectionId) || 0;
          results.set(cacheKey, { items: [], total });
        }

        for (const r of rows) {
          const { collection_id, ...productCols } = r;
          const cacheKey = `${collection_id}:${JSON.stringify(input ?? {})}`;
          results
            .get(cacheKey)
            ?.items.push(productSerializer.deserialize(productCols as ProductTable) as Product);
        }
      }

      return keys.map(key => {
        const cacheKey = `${key.collectionId}:${JSON.stringify(key.args.input ?? {})}`;
        return results.get(cacheKey) || { items: [], total: 0 };
      });
    },
    {
      cacheKeyFn: key => `${key.collectionId}:${JSON.stringify(key.args.input ?? {})}`
    }
  );
}
