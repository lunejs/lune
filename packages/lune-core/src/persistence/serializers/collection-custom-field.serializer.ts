import type {
  CollectionCustomField,
  CollectionCustomFieldTable
} from '../entities/collection-custom-field';

import { Serializer } from './serializer';

export class CollectionCustomFieldSerializer extends Serializer<
  CollectionCustomField,
  CollectionCustomFieldTable
> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['value', 'value'],
      ['collection_id', 'collectionId'],
      ['definition_id', 'definitionId']
    ]);
  }
}
