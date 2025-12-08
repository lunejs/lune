import { convertToCent } from '@lune/common';

import type { VariantTable } from '@/persistence/entities/variant';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ProductConstants } from './product.fixtures';
import { ShopConstants } from './shop.fixtures';

export const VariantConstants = {
  ID: TestUtils.generateUUID(),
  WithAssetsID: TestUtils.generateUUID()
};

export class VariantFixtures implements Fixture<VariantTable> {
  table: Tables = Tables.Variant;

  async build(): Promise<Partial<VariantTable>[]> {
    return [
      {
        id: VariantConstants.ID,
        sale_price: convertToCent(2_300),
        comparison_price: convertToCent(3_000),
        cost_per_unit: convertToCent(1_800),
        sku: 'SKU-617',
        stock: 12,
        requires_shipping: true,
        weight: 1.8,
        dimensions: {
          length: 1,
          width: 1,
          height: 1
        },
        product_id: ProductConstants.ID,
        shop_id: ShopConstants.ID
      },
      {
        id: VariantConstants.WithAssetsID,
        product_id: ProductConstants.ID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
