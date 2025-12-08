import type { OptionValueTable } from '@/persistence/entities/option_value';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { OptionConstants } from './option.fixtures';
import { ShopConstants } from './shop.fixtures';

export const OptionValueConstants = {
  SmallOptionValueID: TestUtils.generateUUID(),
  MediumOptionValueID: TestUtils.generateUUID()
};

export class OptionValueFixtures implements Fixture<OptionValueTable> {
  table: Tables = Tables.OptionValue;

  async build(): Promise<Partial<OptionValueTable>[]> {
    return [
      {
        id: OptionValueConstants.SmallOptionValueID,
        name: 'Small',
        option_id: OptionConstants.SizeOptionID,
        shop_id: ShopConstants.ID
      },
      {
        id: OptionValueConstants.MediumOptionValueID,
        name: 'Medium',
        option_id: OptionConstants.SizeOptionID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
