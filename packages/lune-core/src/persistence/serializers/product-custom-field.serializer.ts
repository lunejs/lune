import type { ProductCustomField, ProductCustomFieldTable } from '../entities/product-custom-field';

import { Serializer } from './serializer';

export class ProductCustomFieldSerializer extends Serializer<
  ProductCustomField,
  ProductCustomFieldTable
> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['value', 'value'],
      ['product_id', 'productId'],
      ['definition_id', 'definitionId']
    ]);
  }
}
