import DataLoader from 'dataloader';

import type { ListInput } from '@/api/shared/types/graphql';
import type { LuneEntity } from '@/persistence/entities/entity';

type KeyType = {
  id: string;
  referenceIds: string[];
  input?: ListInput | null;
};

type ValueType<T> = {
  items: T[];
  count: number;
  pageInfo: { total: number };
};

type Input<Item> = {
  fetchByIds: (ids: string[]) => Promise<Map<string, Item>>;
};

function getCacheKey(key: KeyType): string {
  return `${key.id}:${JSON.stringify(key.referenceIds)}:${JSON.stringify(key.input ?? {})}`;
}

export function referenceLoaderFactory<Item extends LuneEntity>({ fetchByIds }: Input<Item>) {
  return new DataLoader<KeyType, ValueType<Item>, string>(
    async keys => {
      // 1. Collect all unique reference IDs across all keys
      const allReferenceIds = new Set<string>();
      for (const key of keys) {
        for (const refId of key.referenceIds) {
          allReferenceIds.add(refId);
        }
      }

      const uniqueIds = Array.from(allReferenceIds);

      // 2. If no IDs, return empty results for all
      if (uniqueIds.length === 0) {
        return keys.map(() => ({ items: [], count: 0, pageInfo: { total: 0 } }));
      }

      // 3. Single fetch for all referenced items
      const itemsById = await fetchByIds(uniqueIds);

      // 4. Build results for each key with pagination
      return keys.map(key => {
        const { referenceIds, input } = key;
        const total = referenceIds.length;

        // Get items in the order of referenceIds
        const allItems = referenceIds
          .map(id => itemsById.get(id))
          .filter((item): item is Item => item !== undefined);

        // Apply pagination
        const skip = input?.skip ?? 0;
        const take = input?.take ?? allItems.length;
        const paginatedItems = allItems.slice(skip, skip + take);

        return {
          items: paginatedItems,
          count: paginatedItems.length,
          pageInfo: { total }
        };
      });
    },
    { cacheKeyFn: getCacheKey }
  );
}
