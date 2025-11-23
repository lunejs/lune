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
  JacketColorOptionID: TestHelper.generateUUID()
};

export class OptionFixtures implements Fixture<OptionTable> {
  table: Tables = Tables.Option;

  async build(): Promise<Partial<OptionTable>[]> {
    return [
      {
        id: OptionConstants.ColorOptionID,
        name: 'Color',
        shop_id: ShopConstants.ID,
        product_id: ProductConstants.ShirtID
      },
      {
        id: OptionConstants.SizeOptionID,
        name: 'Size',
        shop_id: ShopConstants.ID,
        product_id: ProductConstants.ShirtID
      },
      {
        id: OptionConstants.MaterialOptionID,
        name: 'Material',
        shop_id: ShopConstants.ID,
        product_id: ProductConstants.JacketID
      },
      {
        id: OptionConstants.JacketColorOptionID,
        name: 'Color',
        shop_id: ShopConstants.ID,
        product_id: ProductConstants.JacketID
      }
    ];
  }
}
