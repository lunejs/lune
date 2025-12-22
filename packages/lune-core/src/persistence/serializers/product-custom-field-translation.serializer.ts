import type {
  ProductCustomFieldTranslation,
  ProductCustomFieldTranslationTable
} from '../entities/product-custom-field-translation';

import { Serializer } from './serializer';

export class ProductCustomFieldTranslationSerializer extends Serializer<
  ProductCustomFieldTranslation,
  ProductCustomFieldTranslationTable
> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['value', 'value'],
      ['locale', 'locale'],
      ['product_custom_field_id', 'productCustomFieldId']
    ]);
  }
}
