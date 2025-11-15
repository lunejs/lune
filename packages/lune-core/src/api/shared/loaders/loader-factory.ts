import DataLoader from 'dataloader';

import type { LuneEntity } from '@/persistence/entities/entity';

type CacheKeyType = string;

type ValueType<T> = {
  items: T[];
  total: number;
};

type KeyType<T> = {
  id: string;
  args: T;
};

type Input<Item, Args> = {
  getItemsFn: (keyIds: string[], keyArgs: Args) => Promise<{ keyId: string; item: Item }[]>;
  getCountsFn: (keyIds: string[], keyArgs: Args) => Promise<{ keyId: string; total: number }[]>;
};

/**
 * @description
 * Creates a DataLoader supporting List and ListInput api types
 */
export function loaderFactory<Item extends LuneEntity, Args>({
  getItemsFn,
  getCountsFn
}: Input<Item, Args>) {
  return new DataLoader<KeyType<Args>, ValueType<Item>, CacheKeyType>(
    async keys => {
      const keysByArgs = new Map<string, KeyType<Args>[]>();

      for (const key of keys) {
        const argsKey = JSON.stringify(key.args ?? {});
        if (!keysByArgs.has(argsKey)) {
          keysByArgs.set(argsKey, []);
        }
        keysByArgs.get(argsKey)?.push(key);
      }

      const results = new Map<string, ValueType<Item>>();

      for (const keysGroup of keysByArgs.values()) {
        const ids = keysGroup.map(k => k.id);
        const input = keysGroup[0].args;

        const [rows, countRows] = await Promise.all([
          getItemsFn(ids, input),
          getCountsFn(ids, input)
        ]);

        const totalsById = new Map<string, number>();
        for (const row of countRows) {
          totalsById.set(row.keyId, Number(row.total));
        }

        for (const key of keysGroup) {
          const cacheKey = `${key.id}:${JSON.stringify(key.args ?? {})}`;
          const total = totalsById.get(key.id) || 0;
          results.set(cacheKey, { items: [], total });
        }

        for (const r of rows) {
          const { keyId, item } = r;
          const cacheKey = `${keyId}:${JSON.stringify(input ?? {})}`;
          results.get(cacheKey)?.items.push(item);
        }
      }

      return keys.map(key => {
        const cacheKey = `${key.id}:${JSON.stringify(key.args ?? {})}`;
        return results.get(cacheKey) || { items: [], total: 0 };
      });
    },
    {
      cacheKeyFn: key => `${key.id}:${JSON.stringify(key.args ?? {})}`
    }
  );
}
