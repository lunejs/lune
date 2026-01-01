import type { CustomObjectEntryValueTranslationTable } from '@/persistence/entities/custom-object-entry-value-translation';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';

import { CustomObjectEntryValueConstants } from './custom-object-entry-value.fixtures';
import { ShopConstants } from './shop.fixtures';

export const CustomObjectEntryValueTranslationConstants = {
  Locale: 'es',
  TranslatedValue: 'translated value'
};

export class CustomObjectEntryValueTranslationFixtures implements Fixture<CustomObjectEntryValueTranslationTable> {
  table: Tables = Tables.CustomObjectEntryValueTranslation;

  async build(): Promise<Partial<CustomObjectEntryValueTranslationTable>[]> {
    return [
      {
        entry_value_id: CustomObjectEntryValueConstants.FirstEntryTranslatableValueID,
        locale: CustomObjectEntryValueTranslationConstants.Locale,
        value: JSON.stringify(CustomObjectEntryValueTranslationConstants.TranslatedValue),
        shop_id: ShopConstants.ID
      }
    ];
  }
}
