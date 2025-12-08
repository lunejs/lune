import type { ProductTable } from '@/persistence/entities/product';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const ProductConstants = {
  ID: TestUtils.generateUUID(),
  Name: 'MacBook Pro 16',
  Slug: 'macbook-pro-16',

  MultipleSameName: 'same name',

  NoMatchingName: 'Random slug',
  NoMatchingSlug: 'random-slug'
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
      },
      {
        name: ProductConstants.MultipleSameName,
        slug: 'same-name',
        shop_id: ShopConstants.ID
      },
      {
        name: ProductConstants.MultipleSameName,
        slug: 'same-name-1',
        shop_id: ShopConstants.ID
      },
      {
        name: ProductConstants.MultipleSameName,
        slug: 'same-name-2',
        shop_id: ShopConstants.ID
      },
      {
        name: 'no matching name',
        slug: ProductConstants.NoMatchingSlug,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
