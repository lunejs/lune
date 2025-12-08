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
        name: 'Color',
        shop_id: ShopConstants.ID,
        product_id: ProductConstants.AlreadyTranslatedID
      },
      {
        id: OptionConstants.SizeOptionID,
        name: 'Size',
        shop_id: ShopConstants.ID,
        product_id: ProductConstants.AlreadyTranslatedID
      },
      {
        id: OptionConstants.MaterialOptionID,
        name: 'Material',
        shop_id: ShopConstants.ID,
        product_id: ProductConstants.ID
      },
      {
        id: OptionConstants.JacketColorOptionID,
        name: 'Color',
        shop_id: ShopConstants.ID,
        product_id: ProductConstants.ID
      }
    ];
  }
}
