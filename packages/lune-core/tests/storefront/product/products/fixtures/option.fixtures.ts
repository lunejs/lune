import type { OptionTable } from '@/persistence/entities/option';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ProductConstants } from './product.fixtures';
import { ShopConstants } from './shop.fixtures';

export const OptionConstants = {
  ColorOptionID: TestUtils.generateUUID(),
  SizeOptionID: TestUtils.generateUUID(),
  MaterialOptionID: TestUtils.generateUUID(),
  JacketColorOptionID: TestUtils.generateUUID()
};

export class OptionFixtures implements Fixture<OptionTable> {
  table: Tables = Tables.Option;

  async build(): Promise<Partial<OptionTable>[]> {
    return [
      {
        id: OptionConstants.ColorOptionID,
        product_id: ProductConstants.ShirtID,
        name: 'Color',
        shop_id: ShopConstants.ID
      },
      {
        id: OptionConstants.SizeOptionID,
        product_id: ProductConstants.ShirtID,
        name: 'Size',
        shop_id: ShopConstants.ID
      },
      {
        id: OptionConstants.MaterialOptionID,
        product_id: ProductConstants.JacketID,
        name: 'Material',
        shop_id: ShopConstants.ID
      },
      {
        id: OptionConstants.JacketColorOptionID,
        product_id: ProductConstants.JacketID,
        name: 'Color',
        shop_id: ShopConstants.ID
      }
    ];
  }
}
