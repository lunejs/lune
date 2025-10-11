import { ProductTable } from '@/persistence/entities/product';
import { Tables } from '@/persistence/tables';
import { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { ShopConstants } from './shop.fixtures';

export const ProductConstants = {
  ID: TestHelper.generateUUID(),
  Name: 'MacBook Pro 16',
  Slug: 'mac-pro-16',

  AlreadyTranslatedID: TestHelper.generateUUID(),
  AlreadyTranslatedName: 'T-Shirt',
  AlreadyTranslatedSlug: 't-shirt'
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
      },
      {
        id: ProductConstants.AlreadyTranslatedID,
        name: ProductConstants.AlreadyTranslatedName,
        slug: ProductConstants.AlreadyTranslatedSlug,
        shop_id: ShopConstants.ID,
        description: 'A nice t-shirt'
      }
    ];
  }
}
