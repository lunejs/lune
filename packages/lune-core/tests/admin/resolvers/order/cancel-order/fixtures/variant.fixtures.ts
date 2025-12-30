import { LunePrice } from '@lunejs/common';

import type { VariantTable } from '@/persistence/entities/variant';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ProductConstants } from './product.fixtures';
import { ShopConstants } from './shop.fixtures';

export const VariantConstants = {
  ID: TestUtils.generateUUID(),
  InitialStock: 10
};

export class VariantFixtures implements Fixture<VariantTable> {
  table: Tables = Tables.Variant;

  async build(): Promise<Partial<VariantTable>[]> {
    return [
      {
        id: VariantConstants.ID,
        shop_id: ShopConstants.ID,
        product_id: ProductConstants.ID,
        sale_price: LunePrice.toCent(1000),
        stock: VariantConstants.InitialStock,
        sku: 'TEST-SKU-001'
      }
    ];
  }
}
