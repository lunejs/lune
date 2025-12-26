import type { CustomObjectEntryValueTranslationTable } from '@/persistence/entities/custom-object-entry-value-translation';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomObjectEntryValueConstants } from './custom-object-entry-value.fixtures';
import { ShopConstants } from './shop.fixtures';

export const CustomObjectEntryValueTranslationConstants = {
  AlreadyTranslatedTitleValue: 'Already Translated Title',
  AlreadyTranslatedContentValue: 'Already Translated Content'
};

export class CustomObjectEntryValueTranslationFixtures
  implements Fixture<CustomObjectEntryValueTranslationTable>
{
  table = Tables.CustomObjectEntryValueTranslation;

  async build(): Promise<Partial<CustomObjectEntryValueTranslationTable>[]> {
    return [
      {
        id: TestUtils.generateUUID(),
        value: JSON.stringify(
          CustomObjectEntryValueTranslationConstants.AlreadyTranslatedTitleValue
        ),
        locale: 'en',
        entry_value_id: CustomObjectEntryValueConstants.AlreadyTranslatedTitleValueID,
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        value: JSON.stringify(
          CustomObjectEntryValueTranslationConstants.AlreadyTranslatedContentValue
        ),
        locale: 'en',
        entry_value_id: CustomObjectEntryValueConstants.AlreadyTranslatedContentValueID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
