import type {
  CollectionCustomFieldTranslation,
  CollectionCustomFieldTranslationTable
} from '../entities/collection-custom-field-translation';

import { Serializer } from './serializer';

export class CollectionCustomFieldTranslationSerializer extends Serializer<
  CollectionCustomFieldTranslation,
  CollectionCustomFieldTranslationTable
> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['value', 'value'],
      ['locale', 'locale'],
      ['field_id', 'fieldId']
    ]);
  }
}
