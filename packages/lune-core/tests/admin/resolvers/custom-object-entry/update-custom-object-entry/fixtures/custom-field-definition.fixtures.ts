import type { CustomFieldDefinitionTable } from '@/persistence/entities/custom-field-definition';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomObjectDefinitionConstants } from './custom-object-definition.fixtures';
import { ShopConstants } from './shop.fixtures';

export const CustomFieldDefinitionConstants = {
  TitleFieldID: TestUtils.generateUUID(),
  ContentFieldID: TestUtils.generateUUID(),
  AuthorFieldID: TestUtils.generateUUID()
};

export class CustomFieldDefinitionFixtures implements Fixture<CustomFieldDefinitionTable> {
  table = Tables.CustomFieldDefinition;

  async build(): Promise<Partial<CustomFieldDefinitionTable>[]> {
    return [
      {
        id: CustomFieldDefinitionConstants.TitleFieldID,
        name: 'Title',
        key: 'title',
        is_list: false,
        applies_to_entity: 'custom_object',
        type: 'single_line_text',
        order: 0,
        custom_object_definition_id: CustomObjectDefinitionConstants.ID,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.ContentFieldID,
        name: 'Content',
        key: 'content',
        is_list: false,
        applies_to_entity: 'custom_object',
        type: 'multi_line_text',
        order: 1,
        custom_object_definition_id: CustomObjectDefinitionConstants.ID,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.AuthorFieldID,
        name: 'Author',
        key: 'author',
        is_list: false,
        applies_to_entity: 'custom_object',
        type: 'single_line_text',
        order: 2,
        custom_object_definition_id: CustomObjectDefinitionConstants.ID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
