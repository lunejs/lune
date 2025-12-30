import { LunePrice } from '@lunejs/common';

import type { VariantTable } from '@/persistence/entities/variant';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ProductConstants } from './product.fixtures';
import { ShopConstants } from './shop.fixtures';

export const VariantConstants = {
  VariantID: TestUtils.generateUUID()
};

export class VariantFixtures implements Fixture<VariantTable> {
  table: Tables = Tables.Variant;

  async build(): Promise<Partial<VariantTable>[]> {
    return [
      {
        id: VariantConstants.VariantID,
        shop_id: ShopConstants.ID,
        product_id: ProductConstants.ProductID,
        sale_price: LunePrice.toCent(5000),
        stock: 100,
        sku: 'TEST-SKU-001'
      }
    ];
  }
}
