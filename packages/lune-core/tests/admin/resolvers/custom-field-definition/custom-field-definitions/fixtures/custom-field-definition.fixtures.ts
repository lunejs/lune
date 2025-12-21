import {
  type CustomFieldDefinitionTable,
  CustomFieldType
} from '@/persistence/entities/custom-field-definition';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const CustomFieldDefinitionConstants = {
  TextFieldID: TestUtils.generateUUID(),
  MultiLineTextFieldID: TestUtils.generateUUID(),
  IntegerFieldID: TestUtils.generateUUID(),
  ReferenceFieldID: TestUtils.generateUUID()
};

export class CustomFieldDefinitionFixtures implements Fixture<CustomFieldDefinitionTable> {
  table = Tables.CustomFieldDefinition;

  async build(): Promise<Partial<CustomFieldDefinitionTable>[]> {
    return [
      {
        id: CustomFieldDefinitionConstants.TextFieldID,
        name: 'Short Description',
        key: 'short_description',
        is_list: false,
        applies_to_entity: 'product',
        type: CustomFieldType.SingleLineText,
        metadata: null,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.MultiLineTextFieldID,
        name: 'Long Description',
        key: 'long_description',
        is_list: false,
        applies_to_entity: 'product',
        type: CustomFieldType.MultiLineText,
        metadata: null,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.IntegerFieldID,
        name: 'Stock Count',
        key: 'stock_count',
        is_list: false,
        applies_to_entity: 'product',
        type: CustomFieldType.Integer,
        metadata: null,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.ReferenceFieldID,
        name: 'Related Products',
        key: 'related_products',
        is_list: true,
        applies_to_entity: 'product',
        type: CustomFieldType.Reference,
        metadata: { targetEntity: 'product' },
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        name: 'Another option',
        key: 'another_option',
        is_list: true,
        applies_to_entity: 'collection',
        type: CustomFieldType.Reference,
        metadata: { targetEntity: 'product' },
        shop_id: ShopConstants.ID
      }
    ];
  }
}
