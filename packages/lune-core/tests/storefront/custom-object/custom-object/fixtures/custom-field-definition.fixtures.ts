import type { CustomFieldDefinitionTable } from '@/persistence/entities/custom-field-definition';
import { CustomFieldType } from '@/persistence/entities/custom-field-definition';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomObjectDefinitionConstants } from './custom-object-definition.fixtures';
import { ShopConstants } from './shop.fixtures';

export const CustomFieldDefinitionConstants = {
  TitleFieldID: TestUtils.generateUUID(),
  TitleFieldKey: 'title',

  ContentFieldID: TestUtils.generateUUID(),
  ContentFieldKey: 'content',

  AuthorFieldID: TestUtils.generateUUID(),
  AuthorFieldKey: 'author',

  // Field for testing localization (no applies_to_entity)
  TranslatableFieldID: TestUtils.generateUUID(),
  TranslatableFieldKey: 'translatable_text'
};

export class CustomFieldDefinitionFixtures implements Fixture<CustomFieldDefinitionTable> {
  table: Tables = Tables.CustomFieldDefinition;

  async build(): Promise<Partial<CustomFieldDefinitionTable>[]> {
    return [
      {
        id: CustomFieldDefinitionConstants.TitleFieldID,
        name: 'Title',
        key: CustomFieldDefinitionConstants.TitleFieldKey,
        type: CustomFieldType.SingleLineText,
        is_list: false,
        applies_to_entity: 'product',
        custom_object_definition_id: CustomObjectDefinitionConstants.ID,
        order: 0,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.ContentFieldID,
        name: 'Content',
        key: CustomFieldDefinitionConstants.ContentFieldKey,
        type: CustomFieldType.MultiLineText,
        is_list: false,
        applies_to_entity: 'product',
        custom_object_definition_id: CustomObjectDefinitionConstants.ID,
        order: 1,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.AuthorFieldID,
        name: 'Author',
        key: CustomFieldDefinitionConstants.AuthorFieldKey,
        type: CustomFieldType.SingleLineText,
        is_list: false,
        applies_to_entity: 'product',
        custom_object_definition_id: CustomObjectDefinitionConstants.ID,
        order: 2,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.TranslatableFieldID,
        name: 'Translatable Text',
        key: CustomFieldDefinitionConstants.TranslatableFieldKey,
        type: CustomFieldType.SingleLineText,
        is_list: false,
        custom_object_definition_id: CustomObjectDefinitionConstants.ID,
        order: 3,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
