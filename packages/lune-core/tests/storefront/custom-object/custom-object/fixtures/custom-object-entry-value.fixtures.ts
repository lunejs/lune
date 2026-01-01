import type { CustomObjectEntryValueTable } from '@/persistence/entities/custom-object-entry-value';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomFieldDefinitionConstants } from './custom-field-definition.fixtures';
import { CustomObjectEntryConstants } from './custom-object-entry.fixtures';
import { ShopConstants } from './shop.fixtures';

export const CustomObjectEntryValueConstants = {
  FirstEntryTitleValueID: TestUtils.generateUUID(),
  FirstEntryTitleValue: 'My First Blog Post',

  FirstEntryContentValueID: TestUtils.generateUUID(),
  FirstEntryContentValue: 'This is the content of my first blog post',

  FirstEntryAuthorValueID: TestUtils.generateUUID(),
  FirstEntryAuthorValue: 'John Doe',

  FirstEntryTranslatableValueID: TestUtils.generateUUID(),
  FirstEntryTranslatableValue: 'Original text'
};

export class CustomObjectEntryValueFixtures implements Fixture<CustomObjectEntryValueTable> {
  table: Tables = Tables.CustomObjectEntryValue;

  async build(): Promise<Partial<CustomObjectEntryValueTable>[]> {
    return [
      {
        id: CustomObjectEntryValueConstants.FirstEntryTitleValueID,
        entry_id: CustomObjectEntryConstants.FirstEntryID,
        field_id: CustomFieldDefinitionConstants.TitleFieldID,
        value: JSON.stringify(CustomObjectEntryValueConstants.FirstEntryTitleValue),
        shop_id: ShopConstants.ID
      },
      {
        id: CustomObjectEntryValueConstants.FirstEntryContentValueID,
        entry_id: CustomObjectEntryConstants.FirstEntryID,
        field_id: CustomFieldDefinitionConstants.ContentFieldID,
        value: JSON.stringify(CustomObjectEntryValueConstants.FirstEntryContentValue),
        shop_id: ShopConstants.ID
      },
      {
        id: CustomObjectEntryValueConstants.FirstEntryAuthorValueID,
        entry_id: CustomObjectEntryConstants.FirstEntryID,
        field_id: CustomFieldDefinitionConstants.AuthorFieldID,
        value: JSON.stringify(CustomObjectEntryValueConstants.FirstEntryAuthorValue),
        shop_id: ShopConstants.ID
      },
      {
        id: CustomObjectEntryValueConstants.FirstEntryTranslatableValueID,
        entry_id: CustomObjectEntryConstants.FirstEntryID,
        field_id: CustomFieldDefinitionConstants.TranslatableFieldID,
        value: JSON.stringify(CustomObjectEntryValueConstants.FirstEntryTranslatableValue),
        shop_id: ShopConstants.ID
      }
    ];
  }
}
