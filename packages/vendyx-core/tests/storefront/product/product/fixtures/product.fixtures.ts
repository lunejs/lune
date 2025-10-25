import type { ProductTable } from '@/persistence/entities/product';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { ShopConstants } from './shop.fixtures';

export const ProductConstants = {
  MacBookPro16ID: TestHelper.generateUUID(),
  iPhone14ProMaxID: TestHelper.generateUUID(),
  AppleWatchSeries8ID: TestHelper.generateUUID(),
  DisabledProductId: TestHelper.generateUUID(),

  MacBookPro16Slug: 'mac-pro-16',
  iPhone14ProMaxSlug: 'iphone-14-pro-max',
  AppleWatchSeries8Slug: 'apple-watch-series-8',
  DisabledProductSlug: 'disabled-product',

  MacBookPro16Name: 'MacBook Pro 16',

  MacBookPro16Description: 'The best laptop in the world'
};

export class ProductFixtures implements Fixture<ProductTable> {
  table: Tables = Tables.Product;

  async build(): Promise<Partial<ProductTable>[]> {
    return [
      {
        id: ProductConstants.MacBookPro16ID,
        slug: ProductConstants.MacBookPro16Slug,
        name: ProductConstants.MacBookPro16Name,
        description: ProductConstants.MacBookPro16Description,
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
      },
      {
        id: ProductConstants.DisabledProductId,
        slug: ProductConstants.DisabledProductSlug,
        shop_id: ShopConstants.ID,
        enabled: false
      }
    ];
  }
}
