import type { CustomObjectEntryValueTable } from '@/persistence/entities/custom-object-entry-value';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomFieldDefinitionConstants } from './custom-field-definition.fixtures';
import { CustomObjectEntryConstants } from './custom-object-entry.fixtures';
import { ShopConstants } from './shop.fixtures';

export const CustomObjectEntryValueConstants = {
  Value1ID: TestUtils.generateUUID(),
  Value2ID: TestUtils.generateUUID(),
  Value3ID: TestUtils.generateUUID()
};

export class CustomObjectEntryValueFixtures implements Fixture<CustomObjectEntryValueTable> {
  table = Tables.CustomObjectEntryValue;

  async build(): Promise<Partial<CustomObjectEntryValueTable>[]> {
    return [
      {
        id: CustomObjectEntryValueConstants.Value1ID,
        entry_id: CustomObjectEntryConstants.Entry1ID,
        field_id: CustomFieldDefinitionConstants.TitleFieldID,
        value: JSON.stringify('Title 1'),
        shop_id: ShopConstants.ID
      },
      {
        id: CustomObjectEntryValueConstants.Value2ID,
        entry_id: CustomObjectEntryConstants.Entry2ID,
        field_id: CustomFieldDefinitionConstants.TitleFieldID,
        value: JSON.stringify('Title 2'),
        shop_id: ShopConstants.ID
      },
      {
        id: CustomObjectEntryValueConstants.Value3ID,
        entry_id: CustomObjectEntryConstants.Entry3ID,
        field_id: CustomFieldDefinitionConstants.TitleFieldID,
        value: JSON.stringify('Title 3'),
        shop_id: ShopConstants.ID
      }
    ];
  }
}
