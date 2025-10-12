import type { OptionTable } from '@/persistence/entities/option';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

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
        name: 'Color',
        shop_id: ShopConstants.ID
      },
      {
        id: OptionConstants.SizeOptionID,
        name: 'Size',
        shop_id: ShopConstants.ID
      },
      {
        id: OptionConstants.MaterialOptionID,
        name: 'Material',
        shop_id: ShopConstants.ID
      },
      {
        id: OptionConstants.JacketColorOptionID,
        name: 'Color',
        shop_id: ShopConstants.ID
      },
      {
        id: OptionConstants.WithNoValues,
        name: 'With no values',
        shop_id: ShopConstants.ID
      }
    ];
  }
}
