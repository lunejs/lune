import type { Tag, TagTable } from '../entities/tag';

import { Serializer } from './serializer';

export class TagSerializer extends Serializer<Tag, TagTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['name', 'name']
    ]);
  }
}
