import {
  type CustomFieldDefinitionTable,
  CustomFieldType
} from '@/persistence/entities/custom-field-definition';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const CustomFieldDefinitionConstants = {
  ToRemoveID: TestUtils.generateUUID(),
  AnotherFieldID: TestUtils.generateUUID()
};

export class CustomFieldDefinitionFixtures implements Fixture<CustomFieldDefinitionTable> {
  table = Tables.CustomFieldDefinition;

  async build(): Promise<Partial<CustomFieldDefinitionTable>[]> {
    return [
      {
        id: CustomFieldDefinitionConstants.ToRemoveID,
        name: 'Field To Remove',
        key: 'field_to_remove',
        is_list: false,
        applies_to_entity: 'product',
        type: CustomFieldType.SingleLineText,
        metadata: null,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.AnotherFieldID,
        name: 'Another Field',
        key: 'another_field',
        is_list: false,
        applies_to_entity: 'product',
        type: CustomFieldType.Integer,
        metadata: null,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
