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
  ReferenceFieldID: TestUtils.generateUUID()
};

export class CustomFieldDefinitionFixtures implements Fixture<CustomFieldDefinitionTable> {
  table = Tables.CustomFieldDefinition;

  async build(): Promise<Partial<CustomFieldDefinitionTable>[]> {
    return [
      {
        id: CustomFieldDefinitionConstants.TextFieldID,
        name: 'Original Name',
        key: 'original_name',
        is_list: false,
        applies_to_entity: 'product',
        type: CustomFieldType.SingleLineText,
        metadata: null,
        order: 0,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.ReferenceFieldID,
        name: 'Related Products',
        key: 'related_products',
        is_list: true,
        applies_to_entity: 'product',
        type: CustomFieldType.ProductReference,
        metadata: null,
        order: 1,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
