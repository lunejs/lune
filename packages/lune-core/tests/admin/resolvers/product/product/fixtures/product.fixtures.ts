import type { ProductTable } from '@/persistence/entities/product';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const ProductConstants = {
  MacBookPro16ID: TestUtils.generateUUID(),
  iPhone14ProMaxID: TestUtils.generateUUID(),
  AppleWatchSeries8ID: TestUtils.generateUUID(),

  MacBookPro16Slug: 'mac-pro-16',
  iPhone14ProMaxSlug: 'iphone-14-pro-max',
  AppleWatchSeries8Slug: 'apple-watch-series-8'
};

export class ProductFixtures implements Fixture<ProductTable> {
  table: Tables = Tables.Product;

  async build(): Promise<Partial<ProductTable>[]> {
    return [
      {
        id: ProductConstants.MacBookPro16ID,
        slug: ProductConstants.MacBookPro16Slug,
        shop_id: ShopConstants.ID
      },
      {
        id: ProductConstants.iPhone14ProMaxID,
        slug: ProductConstants.iPhone14ProMaxSlug,
        shop_id: ShopConstants.ID
      },
      {
        id: ProductConstants.AppleWatchSeries8ID,
        slug: ProductConstants.AppleWatchSeries8Slug,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
