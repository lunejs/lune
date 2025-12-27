import {
  CustomFieldAppliesTo,
  type CustomFieldDefinitionTable,
  CustomFieldType
} from '@/persistence/entities/custom-field-definition';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const CustomFieldDefinitionConstants = {
  ToRemoveID: TestUtils.generateUUID(),
  AnotherFieldID: TestUtils.generateUUID(),
  CollectionFieldToRemoveID: TestUtils.generateUUID(),
  AnotherCollectionFieldID: TestUtils.generateUUID()
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
        applies_to_entity: CustomFieldAppliesTo.Product,
        type: CustomFieldType.SingleLineText,
        metadata: null,
        order: 0,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.AnotherFieldID,
        name: 'Another Field',
        key: 'another_field',
        is_list: false,
        applies_to_entity: CustomFieldAppliesTo.Product,
        type: CustomFieldType.Integer,
        metadata: null,
        order: 1,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.CollectionFieldToRemoveID,
        name: 'Collection Field To Remove',
        key: 'collection_field_to_remove',
        is_list: false,
        applies_to_entity: CustomFieldAppliesTo.Collection,
        type: CustomFieldType.SingleLineText,
        metadata: null,
        order: 0,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.AnotherCollectionFieldID,
        name: 'Another Collection Field',
        key: 'another_collection_field',
        is_list: false,
        applies_to_entity: CustomFieldAppliesTo.Collection,
        type: CustomFieldType.SingleLineText,
        metadata: null,
        order: 1,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
