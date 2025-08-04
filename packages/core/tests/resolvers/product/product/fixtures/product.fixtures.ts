import { ProductTable } from '@/persistence/entities/product';
import { Tables } from '@/persistence/tables';
import { Fixture } from '@/tests/utils/fixtures';
import { ShopConstants } from './shop.fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

export const ProductConstants = {
  MacBookPro16ID: TestHelper.generateUUID(),
  iPhone14ProMaxID: TestHelper.generateUUID(),
  AppleWatchSeries8ID: TestHelper.generateUUID()
};

export class ProductFixtures implements Fixture<ProductTable> {
  table: Tables = Tables.Product;

  async build(): Promise<Partial<ProductTable>[]> {
    return [
      {
        id: ProductConstants.MacBookPro16ID,
        shop_id: ShopConstants.ID
      },
      {
        id: ProductConstants.iPhone14ProMaxID,
        shop_id: ShopConstants.ID
      },
      {
        id: ProductConstants.AppleWatchSeries8ID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
