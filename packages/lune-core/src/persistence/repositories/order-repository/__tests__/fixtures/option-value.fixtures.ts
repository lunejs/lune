import type { OptionValueTable } from '@/persistence/entities/option_value';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { OptionConstants } from './option.fixtures';
import { OptionValuePresetConstants } from './option-value-preset.fixtures';
import { ShopConstants } from './shop.fixtures';

export const OptionValueConstants = {
  CottonOptionValueID: TestUtils.generateUUID(),
  PolyesterOptionValueID: TestUtils.generateUUID(),
  WoolOptionValueID: TestUtils.generateUUID()
};

export class OptionValueFixtures implements Fixture<OptionValueTable> {
  table: Tables = Tables.OptionValue;

  async build(): Promise<Partial<OptionValueTable>[]> {
    return [
      {
        id: OptionValueConstants.CottonOptionValueID,
        name: 'Cotton',
        option_id: OptionConstants.MaterialOptionID,
        shop_id: ShopConstants.ID,
        option_value_preset_id: OptionValuePresetConstants.BluePresetID
      },
      {
        id: OptionValueConstants.PolyesterOptionValueID,
        name: 'Polyester',
        option_id: OptionConstants.MaterialOptionID,
        option_value_preset_id: OptionValuePresetConstants.GreenPresetID,
        shop_id: ShopConstants.ID
      },
      {
        id: OptionValueConstants.WoolOptionValueID,
        name: 'Wool',
        option_id: OptionConstants.MaterialOptionID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
