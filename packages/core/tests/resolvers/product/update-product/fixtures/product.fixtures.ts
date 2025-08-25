import { ProductTable } from '@/persistence/entities/product';
import { Tables } from '@/persistence/tables';
import { Fixture } from '@/tests/utils/fixtures';
import { ShopConstants } from './shop.fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

export const ProductConstants = {
  ID: TestHelper.generateUUID(),
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
        shop_id: ShopConstants.ID
      }
    ];
  }
}
