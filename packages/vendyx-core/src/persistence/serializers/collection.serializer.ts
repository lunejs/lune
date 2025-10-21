import type { Collection, CollectionTable } from '../entities/collection';

import { Serializer } from './serializer';

export class CollectionSerializer extends Serializer<Collection, CollectionTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['name', 'name'],
      ['slug', 'slug'],
      ['description', 'description'],
      ['enabled', 'enabled'],
      ['content_type', 'contentType'],
      ['order', 'order']
    ]);
  }
}
