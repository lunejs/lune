import type { CustomObjectEntryValueTable } from '@/persistence/entities/custom-object-entry-value';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomFieldDefinitionConstants } from './custom-field-definition.fixtures';
import { CustomObjectEntryConstants } from './custom-object-entry.fixtures';
import { ShopConstants } from './shop.fixtures';

export const CustomObjectEntryValueConstants = {
  TitleValueID: TestUtils.generateUUID(),
  TitleValue: 'Mi Post de Blog',
  ContentValueID: TestUtils.generateUUID(),
  ContentValue: 'Este es el contenido de mi post',
  AlreadyTranslatedTitleValueID: TestUtils.generateUUID(),
  AlreadyTranslatedTitleValue: 'Post Ya Traducido',
  AlreadyTranslatedContentValueID: TestUtils.generateUUID(),
  AlreadyTranslatedContentValue: 'Contenido ya traducido'
};

export class CustomObjectEntryValueFixtures implements Fixture<CustomObjectEntryValueTable> {
  table = Tables.CustomObjectEntryValue;

  async build(): Promise<Partial<CustomObjectEntryValueTable>[]> {
    return [
      {
        id: CustomObjectEntryValueConstants.TitleValueID,
        value: JSON.stringify(CustomObjectEntryValueConstants.TitleValue),
        entry_id: CustomObjectEntryConstants.ID,
        field_id: CustomFieldDefinitionConstants.TitleFieldID,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomObjectEntryValueConstants.ContentValueID,
        value: JSON.stringify(CustomObjectEntryValueConstants.ContentValue),
        entry_id: CustomObjectEntryConstants.ID,
        field_id: CustomFieldDefinitionConstants.ContentFieldID,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomObjectEntryValueConstants.AlreadyTranslatedTitleValueID,
        value: JSON.stringify(CustomObjectEntryValueConstants.AlreadyTranslatedTitleValue),
        entry_id: CustomObjectEntryConstants.AlreadyTranslatedID,
        field_id: CustomFieldDefinitionConstants.TitleFieldID,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomObjectEntryValueConstants.AlreadyTranslatedContentValueID,
        value: JSON.stringify(CustomObjectEntryValueConstants.AlreadyTranslatedContentValue),
        entry_id: CustomObjectEntryConstants.AlreadyTranslatedID,
        field_id: CustomFieldDefinitionConstants.ContentFieldID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
