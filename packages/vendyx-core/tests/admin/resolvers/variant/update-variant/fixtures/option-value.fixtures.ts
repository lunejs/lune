import type { OptionValueTable } from '@/persistence/entities/option_value';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { OptionConstants } from './option.fixtures';
import { ShopConstants } from './shop.fixtures';

export const OptionValueConstants = {
  BlueOptionValueID: TestHelper.generateUUID(),
  LargeOptionValueID: TestHelper.generateUUID(),
  PolyesterOptionValueID: TestHelper.generateUUID()
};

export class OptionValueFixtures implements Fixture<OptionValueTable> {
  table: Tables = Tables.OptionValue;

  async build(): Promise<Partial<OptionValueTable>[]> {
    return [
      {
        id: OptionValueConstants.BlueOptionValueID,
        name: 'Blue',
        option_id: OptionConstants.ColorOptionID,
        shop_id: ShopConstants.ID
      },
      {
        id: OptionValueConstants.LargeOptionValueID,
        name: 'Large',
        option_id: OptionConstants.SizeOptionID,
        shop_id: ShopConstants.ID
      },
      {
        id: OptionValueConstants.PolyesterOptionValueID,
        name: 'Polyester',
        option_id: OptionConstants.MaterialOptionId,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
