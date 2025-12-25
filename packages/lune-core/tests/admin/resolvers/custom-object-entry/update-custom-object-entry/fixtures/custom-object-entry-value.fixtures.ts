import type { CustomObjectEntryValueTable } from '@/persistence/entities/custom-object-entry-value';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomFieldDefinitionConstants } from './custom-field-definition.fixtures';
import { CustomObjectEntryConstants } from './custom-object-entry.fixtures';
import { ShopConstants } from './shop.fixtures';

export const CustomObjectEntryValueConstants = {
  TitleValueID: TestUtils.generateUUID(),
  ContentValueID: TestUtils.generateUUID(),
  TitleValue: 'Original Title',
  ContentValue: 'Original Content'
};

export class CustomObjectEntryValueFixtures implements Fixture<CustomObjectEntryValueTable> {
  table = Tables.CustomObjectEntryValue;

  async build(): Promise<Partial<CustomObjectEntryValueTable>[]> {
    return [
      {
        id: CustomObjectEntryValueConstants.TitleValueID,
        entry_id: CustomObjectEntryConstants.ID,
        field_id: CustomFieldDefinitionConstants.TitleFieldID,
        value: JSON.stringify(CustomObjectEntryValueConstants.TitleValue),
        shop_id: ShopConstants.ID
      },
      {
        id: CustomObjectEntryValueConstants.ContentValueID,
        entry_id: CustomObjectEntryConstants.ID,
        field_id: CustomFieldDefinitionConstants.ContentFieldID,
        value: JSON.stringify(CustomObjectEntryValueConstants.ContentValue),
        shop_id: ShopConstants.ID
      }
    ];
  }
}
