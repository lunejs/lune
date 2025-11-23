import type { OptionTable } from '@/persistence/entities/option';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { ProductConstants } from './product.fixtures';
import { ShopConstants } from './shop.fixtures';

export const OptionConstants = {
  ColorOptionID: TestHelper.generateUUID(),
  SizeOptionID: TestHelper.generateUUID(),
  MaterialOptionID: TestHelper.generateUUID(),
  JacketColorOptionID: TestHelper.generateUUID(),
  WithNoValues: TestHelper.generateUUID()
};

export class OptionFixtures implements Fixture<OptionTable> {
  table: Tables = Tables.Option;

  async build(): Promise<Partial<OptionTable>[]> {
    return [
      {
        id: OptionConstants.ColorOptionID,
        product_id: ProductConstants.ID,
        order: 0,
        name: 'Color',
        shop_id: ShopConstants.ID
      },
      {
        id: OptionConstants.SizeOptionID,
        product_id: ProductConstants.ID,
        name: 'Size',
        order: 1,
        shop_id: ShopConstants.ID
      },
      {
        id: OptionConstants.MaterialOptionID,
        product_id: ProductConstants.ID,
        name: 'Material',
        order: 2,
        shop_id: ShopConstants.ID
      },
      {
        id: OptionConstants.JacketColorOptionID,
        product_id: ProductConstants.ID,
        name: 'Jacket Color',
        order: 3,
        shop_id: ShopConstants.ID
      },
      {
        id: OptionConstants.WithNoValues,
        product_id: ProductConstants.ID,
        name: 'With no values',
        order: 4,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
