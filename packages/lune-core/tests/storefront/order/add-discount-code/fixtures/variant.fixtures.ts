import { LunePrice } from '@lunejs/common';

import type { VariantTable } from '@/persistence/entities/variant';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ProductConstants } from './product.fixtures';
import { ShopConstants } from './shop.fixtures';

export const VariantConstants = {
  ID: TestUtils.generateUUID(),

  AlreadyInLineID: TestUtils.generateUUID()
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
      }
    ];
  }
}
