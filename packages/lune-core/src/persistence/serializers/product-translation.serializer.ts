import type { ProductTranslation, ProductTranslationTable } from '../entities/product-translation';

import { Serializer } from './serializer';

export class ProductTranslationSerializer extends Serializer<
  ProductTranslation,
  ProductTranslationTable
> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['name', 'name'],
      ['slug', 'slug'],
      ['description', 'description'],
      ['locale', 'locale'],
      ['product_id', 'productId']
    ]);
  }
}
