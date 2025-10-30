import type { VariantTable } from '@/persistence/entities/variant';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { ProductConstants } from './product.fixtures';
import { ShopConstants } from './shop.fixtures';

export const VariantConstants = {
  RedSmallShirtID: TestHelper.generateUUID(),
  GreenSmallShirtID: TestHelper.generateUUID(),
  BlueSmallShirtID: TestHelper.generateUUID(),
  RedMediumShirtID: TestHelper.generateUUID(),
  GreenMediumShirtID: TestHelper.generateUUID(),
  BlueMediumShirtID: TestHelper.generateUUID(),
  RedLargeShirtID: TestHelper.generateUUID(),
  GreenLargeShirtID: TestHelper.generateUUID(),
  BlueLargeShirtID: TestHelper.generateUUID(),

  CottonRedJacketID: TestHelper.generateUUID(),
  PolyesterRedJacketID: TestHelper.generateUUID(),
  LeatherRedJacketID: TestHelper.generateUUID()
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
