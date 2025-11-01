import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection';
import type {
  CollectionTranslation,
  CollectionTranslationTable
} from '@/persistence/entities/collection-translation';
import { CollectionTranslationSerializer } from '@/persistence/serializers/collection-translation.serializer';
import { Tables } from '@/persistence/tables';

export function createCollectionTranslationsLoader(trx: Transaction) {
  return new DataLoader<string, CollectionTranslation[]>(async collectionIds => {
    const rows: CollectionTranslationTable[] = await trx(Tables.CollectionTranslation)
      .whereIn('collection_id', collectionIds)
      .orderBy('created_at', 'asc');

    const collectionTranslationSerializer = new CollectionTranslationSerializer();

    const byProductId = new Map<string, CollectionTranslation[]>();
    for (const id of collectionIds) byProductId.set(id, []);

    for (const r of rows) {
      const { collection_id, ...translationCols } = r;
      const translation = collectionTranslationSerializer.deserialize(
        translationCols as CollectionTranslationTable
      ) as CollectionTranslation;
      byProductId.get(collection_id)?.push(translation);
    }

    return (collectionIds as string[]).map(id => byProductId.get(id) ?? []);
  });
}
