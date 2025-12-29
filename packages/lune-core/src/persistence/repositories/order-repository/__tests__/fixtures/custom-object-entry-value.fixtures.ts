import type { CustomObjectEntryValueTable } from '@/persistence/entities/custom-object-entry-value';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomFieldDefinitionConstants } from './custom-field-definition.fixtures';
import { CustomObjectEntryConstants } from './custom-object-entry.fixtures';
import { ShopConstants } from './shop.fixtures';

export const CustomObjectEntryValueConstants = {
  RedNameValueID: TestUtils.generateUUID(),
  RedHexValueID: TestUtils.generateUUID(),
  RedNameValue: 'Red',
  RedHexValue: '#FF0000'
};

export class CustomObjectEntryValueFixtures implements Fixture<CustomObjectEntryValueTable> {
  table: Tables = Tables.CustomObjectEntryValue;

  async build(): Promise<Partial<CustomObjectEntryValueTable>[]> {
    return [
      {
        id: CustomObjectEntryValueConstants.RedNameValueID,
        value: JSON.stringify(CustomObjectEntryValueConstants.RedNameValue),
        entry_id: CustomObjectEntryConstants.RedColorEntryID,
        field_id: CustomFieldDefinitionConstants.ColorNameFieldID,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomObjectEntryValueConstants.RedHexValueID,
        value: JSON.stringify(CustomObjectEntryValueConstants.RedHexValue),
        entry_id: CustomObjectEntryConstants.RedColorEntryID,
        field_id: CustomFieldDefinitionConstants.ColorHexFieldID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
