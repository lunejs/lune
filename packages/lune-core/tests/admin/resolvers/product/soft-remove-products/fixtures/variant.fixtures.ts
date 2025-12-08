import type { VariantTable } from '@/persistence/entities/variant';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ProductConstants } from './product.fixtures';
import { ShopConstants } from './shop.fixtures';

export const VariantConstants = {
  RedSmallShirtID: TestUtils.generateUUID(),
  GreenSmallShirtID: TestUtils.generateUUID(),
  BlueSmallShirtID: TestUtils.generateUUID(),
  RedMediumShirtID: TestUtils.generateUUID(),
  GreenMediumShirtID: TestUtils.generateUUID(),
  BlueMediumShirtID: TestUtils.generateUUID(),
  RedLargeShirtID: TestUtils.generateUUID(),
  GreenLargeShirtID: TestUtils.generateUUID(),
  BlueLargeShirtID: TestUtils.generateUUID(),

  CottonRedJacketID: TestUtils.generateUUID(),
  PolyesterRedJacketID: TestUtils.generateUUID(),
  LeatherRedJacketID: TestUtils.generateUUID()
};

export class VariantFixtures implements Fixture<VariantTable> {
  table: Tables = Tables.Variant;

  async build(): Promise<Partial<VariantTable>[]> {
    return [
      {
        id: VariantConstants.RedSmallShirtID,
        product_id: ProductConstants.ShirtID,
        shop_id: ShopConstants.ID
      },
      {
        id: VariantConstants.GreenSmallShirtID,
        product_id: ProductConstants.ShirtID,
        shop_id: ShopConstants.ID
      },
      {
        id: VariantConstants.BlueSmallShirtID,
        product_id: ProductConstants.ShirtID,
        shop_id: ShopConstants.ID
      },
      {
        id: VariantConstants.RedMediumShirtID,
        product_id: ProductConstants.ShirtID,
        shop_id: ShopConstants.ID
      },
      {
        id: VariantConstants.GreenMediumShirtID,
        product_id: ProductConstants.ShirtID,
        shop_id: ShopConstants.ID
      },
      {
        id: VariantConstants.BlueMediumShirtID,
        product_id: ProductConstants.ShirtID,
        shop_id: ShopConstants.ID
      },
      {
        id: VariantConstants.RedLargeShirtID,
        product_id: ProductConstants.ShirtID,
        shop_id: ShopConstants.ID
      },
      {
        id: VariantConstants.GreenLargeShirtID,
        product_id: ProductConstants.ShirtID,
        shop_id: ShopConstants.ID
      },
      {
        id: VariantConstants.BlueLargeShirtID,
        product_id: ProductConstants.ShirtID,
        shop_id: ShopConstants.ID
      },

      {
        id: VariantConstants.CottonRedJacketID,
        product_id: ProductConstants.JacketID,
        shop_id: ShopConstants.ID
      },
      {
        id: VariantConstants.PolyesterRedJacketID,
        product_id: ProductConstants.JacketID,
        shop_id: ShopConstants.ID
      },
      {
        id: VariantConstants.LeatherRedJacketID,
        product_id: ProductConstants.JacketID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
