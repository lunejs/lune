import type { ProductTable } from '@/persistence/entities/product';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const ProductConstants = {
  ID: TestUtils.generateUUID(),
  Name: 'MacBook Pro 16',
  Slug: 'mac-pro-16'
};

export class ProductFixtures implements Fixture<ProductTable> {
  table: Tables = Tables.Product;

  async build(): Promise<Partial<ProductTable>[]> {
    return [
      {
        id: ProductConstants.ID,
        name: ProductConstants.Name,
        slug: ProductConstants.Slug,
        shop_id: ShopConstants.ID,
        description: 'The best computer ever made'
      }
    ];
  }
}
