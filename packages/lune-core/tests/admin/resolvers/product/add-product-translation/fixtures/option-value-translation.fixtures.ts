import { Locale } from '@/persistence/entities/locale';
import type {
  OptionValueTranslation,
  OptionValueTranslationTable
} from '@/persistence/entities/option-value-translation';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { OptionValueConstants } from './option-value.fixtures';
import { ShopConstants } from './shop.fixtures';

export const OptionValueTranslationConstants = {
  BlueID: TestUtils.generateUUID(),
  GreenID: TestUtils.generateUUID(),
  RedID: TestUtils.generateUUID(),
  SmallID: TestUtils.generateUUID(),
  MediumID: TestUtils.generateUUID(),
  LargeID: TestUtils.generateUUID()
};

export class OptionValueTranslationFixtures implements Fixture<OptionValueTranslation> {
  table: Tables = Tables.OptionValueTranslation;

  async build(): Promise<Partial<OptionValueTranslationTable>[]> {
    return [
      {
        id: OptionValueTranslationConstants.BlueID,
        name: 'Blue en',
        locale: Locale.EN,
        shop_id: ShopConstants.ID,
        option_value_id: OptionValueConstants.BlueOptionValueID
      },
      {
        id: OptionValueTranslationConstants.GreenID,
        name: 'Green en',
        locale: Locale.EN,
        shop_id: ShopConstants.ID,
        option_value_id: OptionValueConstants.GreenOptionValueID
      },
      {
        id: OptionValueTranslationConstants.RedID,
        name: 'Red en',
        locale: Locale.EN,
        shop_id: ShopConstants.ID,
        option_value_id: OptionValueConstants.RedOptionValueID
      },
      //
      {
        id: OptionValueTranslationConstants.SmallID,
        name: 'Small en',
        locale: Locale.EN,
        shop_id: ShopConstants.ID,
        option_value_id: OptionValueConstants.SmallOptionValueID
      },
      {
        id: OptionValueTranslationConstants.MediumID,
        name: 'Medium en',
        locale: Locale.EN,
        shop_id: ShopConstants.ID,
        option_value_id: OptionValueConstants.MediumOptionValueID
      },
      {
        id: OptionValueTranslationConstants.LargeID,
        name: 'Large en',
        locale: Locale.EN,
        shop_id: ShopConstants.ID,
        option_value_id: OptionValueConstants.LargeOptionValueID
      }
    ];
  }
}
