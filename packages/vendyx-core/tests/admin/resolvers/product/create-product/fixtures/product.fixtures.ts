import type { ProductTable } from '@/persistence/entities/product';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { ShopConstants } from './shop.fixtures';

export const ProductConstants = {
  ID: TestHelper.generateUUID(),
  Name: 'MacBook Pro 16',
  Slug: 'macbook-pro-16'
};

export class ProductFixtures implements Fixture<ProductTable> {
  table: Tables = Tables.Product;

  async build(): Promise<Partial<ProductTable>[]> {
    return [
      {
        id: ProductConstants.ID,
        name: ProductConstants.Name,
        slug: ProductConstants.Slug,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
