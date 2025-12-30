import { LunePrice } from '@lunejs/common';

import type { VariantTable } from '@/persistence/entities/variant';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ProductConstants } from './product.fixtures';
import { ShopConstants } from './shop.fixtures';

export const VariantConstants = {
  ID: TestUtils.generateUUID(),
  Price: 1_500,
  Stock: 10,

  LowStockID: TestUtils.generateUUID(),
  LowStockPrice: 800,
  LowStock: 2
};

export class VariantFixtures implements Fixture<VariantTable> {
  table: Tables = Tables.Variant;

  async build(): Promise<Partial<VariantTable>[]> {
    return [
      {
        id: VariantConstants.ID,
        product_id: ProductConstants.ID,
        shop_id: ShopConstants.ID,
        sale_price: LunePrice.toCent(VariantConstants.Price),
        stock: VariantConstants.Stock
      },
      {
        id: VariantConstants.LowStockID,
        product_id: ProductConstants.ID,
        shop_id: ShopConstants.ID,
        sale_price: LunePrice.toCent(VariantConstants.LowStockPrice),
        stock: VariantConstants.LowStock
      }
    ];
  }
}
