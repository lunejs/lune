import {
  type CustomFieldDefinitionTable,
  CustomFieldType
} from '@/persistence/entities/custom-field-definition';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomObjectDefinitionConstants } from './custom-object-definition.fixtures';
import { ShopConstants } from './shop.fixtures';

export const CustomFieldDefinitionConstants = {
  TitleFieldID: TestUtils.generateUUID(),
  ContentFieldID: TestUtils.generateUUID()
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
        applies_to_entity: 'product',
        type: CustomFieldType.SingleLineText,
        metadata: null,
        custom_object_definition_id: CustomObjectDefinitionConstants.FirstID,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.ContentFieldID,
        name: 'Content',
        key: 'content',
        is_list: false,
        applies_to_entity: 'product',
        type: CustomFieldType.MultiLineText,
        metadata: null,
        custom_object_definition_id: CustomObjectDefinitionConstants.FirstID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
