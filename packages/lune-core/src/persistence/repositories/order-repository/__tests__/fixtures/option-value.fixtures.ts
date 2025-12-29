import type { OptionValueTable } from '@/persistence/entities/option_value';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomObjectEntryConstants } from './custom-object-entry.fixtures';
import { OptionConstants } from './option.fixtures';
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
        custom_object_entry_id: CustomObjectEntryConstants.RedColorEntryID,
        shop_id: ShopConstants.ID
      },
      {
        id: OptionValueConstants.PolyesterOptionValueID,
        name: 'Polyester',
        option_id: OptionConstants.MaterialOptionID,
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
