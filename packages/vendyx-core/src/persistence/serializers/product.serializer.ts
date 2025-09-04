import { Product, ProductTable } from '../entities/product';

import { Serializer } from './serializer';

export class ProductSerializer extends Serializer<Product, ProductTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['deleted_at', 'deletedAt'],
      ['name', 'name'],
      ['slug', 'slug'],
      ['description', 'description'],
      ['enabled', 'enabled'],
      ['archived', 'archived'],
      ['min_sale_price', 'minSalePrice'],
      ['max_sale_price', 'maxSalePrice']
    ]);
  }
}
