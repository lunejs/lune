import type {
  CollectionTranslation,
  CollectionTranslationTable
} from '../entities/collection-translation';

import { Serializer } from './serializer';

export class CollectionTranslationSerializer extends Serializer<
  CollectionTranslation,
  CollectionTranslationTable
> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['name', 'name'],
      ['slug', 'slug'],
      ['description', 'description'],
      ['locale', 'locale'],
      ['collection_id', 'collectionId']
    ]);
  }
}
