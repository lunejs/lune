import { Locale } from '@/persistence/entities/locale';
import type {
  OptionTranslation,
  OptionTranslationTable
} from '@/persistence/entities/option-translation';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { OptionConstants } from './option.fixtures';
import { ShopConstants } from './shop.fixtures';

export const OptionTranslationConstants = {
  ColorID: TestHelper.generateUUID(),
  ColorTranslatedName: 'Color en',
  SizeID: TestHelper.generateUUID(),
  SizeTranslatedName: 'Size en'
};

export class OptionTranslationFixtures implements Fixture<OptionTranslation> {
  table: Tables = Tables.OptionTranslation;

  async build(): Promise<Partial<OptionTranslationTable>[]> {
    return [
      {
        id: OptionTranslationConstants.ColorID,
        name: OptionTranslationConstants.ColorTranslatedName,
        locale: Locale.EN,
        shop_id: ShopConstants.ID,
        option_id: OptionConstants.ColorOptionID
      },
      {
        id: OptionTranslationConstants.SizeID,
        name: OptionTranslationConstants.SizeTranslatedName,
        locale: Locale.EN,
        shop_id: ShopConstants.ID,
        option_id: OptionConstants.SizeOptionID
      }
    ];
  }
}
