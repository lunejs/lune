import type { Transaction } from '@/persistence/connection/connection';
import type { Collection } from '@/persistence/entities/collection';
import { CollectionSerializer } from '@/persistence/serializers/collection.serializer';
import { Tables } from '@/persistence/tables';

import { referenceLoaderFactory } from '../reference-loader-factory';

export function createCustomFieldCollectionReferencesLoader(trx: Transaction) {
  const serializer = new CollectionSerializer();

  return referenceLoaderFactory<Collection>({
    async fetchByIds(ids) {
      const rows = await trx.from(Tables.Collection).whereIn('id', ids).select('*');

      const itemsById = new Map<string, Collection>();
      for (const row of rows) {
        const collection = serializer.deserialize(row) as Collection;
        itemsById.set(collection.id, collection);
      }

      return itemsById;
    }
  });
}
