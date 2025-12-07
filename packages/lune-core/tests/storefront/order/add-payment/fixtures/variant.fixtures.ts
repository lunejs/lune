import { LunePrice } from '@lune/common';

import type { VariantTable } from '@/persistence/entities/variant';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { ProductConstants } from './product.fixtures';
import { ShopConstants } from './shop.fixtures';

export const VariantConstants = {
  ID: TestHelper.generateUUID(),

  AlreadyInLineID: TestHelper.generateUUID(),

  LowStockID: TestHelper.generateUUID()
};

export class VariantFixtures implements Fixture<VariantTable> {
  table: Tables = Tables.Variant;

  async build(): Promise<Partial<VariantTable>[]> {
    return [
      {
        id: VariantConstants.AlreadyInLineID,
        product_id: ProductConstants.ShirtID,
        shop_id: ShopConstants.ID,
        sale_price: LunePrice.toCent(800),
        stock: 3
      },
      {
        id: VariantConstants.ID,
        product_id: ProductConstants.ShirtID,
        shop_id: ShopConstants.ID,
        sale_price: LunePrice.toCent(1_300),
        stock: 3
      },
      {
        id: VariantConstants.LowStockID,
        product_id: ProductConstants.ShirtID,
        shop_id: ShopConstants.ID,
        sale_price: LunePrice.toCent(500),
        stock: 0
      }
    ];
  }
}
