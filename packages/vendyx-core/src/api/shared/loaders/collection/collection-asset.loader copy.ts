import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection';
import type { Collection, CollectionTable } from '@/persistence/entities/collection';
import { CollectionSerializer } from '@/persistence/serializers/collection.serializer';
import { Tables } from '@/persistence/tables';

export function createCollectionSubCollectionsLoader(trx: Transaction) {
  const collectionSerializer = new CollectionSerializer();

  return new DataLoader<string, Collection[]>(async collectionIds => {
    const ids = collectionIds as string[];

    const rows = await trx<CollectionTable>(Tables.Collection)
      .whereIn('parent_id', ids)
      .orderBy('order');

    const byId = new Map<string, Collection[]>();
    for (const id of ids) byId.set(id, []);

    for (const r of rows) {
      const { id, ...collectionCols } = r;
      byId.get(id)?.push({
        ...(collectionSerializer.deserialize(collectionCols as CollectionTable) as Collection)
      });
    }

    return ids.map(id => byId.get(id) as Collection[]);
  });
}
