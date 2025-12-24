import {
  type CustomFieldDefinitionTable,
  CustomFieldType
} from '@/persistence/entities/custom-field-definition';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const CustomFieldDefinitionConstants = {
  ExistingFieldID: TestUtils.generateUUID(),
  DuplicateKey: 'existing_field'
};

export class CustomFieldDefinitionFixtures implements Fixture<CustomFieldDefinitionTable> {
  table = Tables.CustomFieldDefinition;

  async build(): Promise<Partial<CustomFieldDefinitionTable>[]> {
    return [
      {
        id: CustomFieldDefinitionConstants.ExistingFieldID,
        name: 'Existing Field',
        key: CustomFieldDefinitionConstants.DuplicateKey,
        is_list: false,
        applies_to_entity: 'product',
        type: CustomFieldType.SingleLineText,
        metadata: null,
        order: 0,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
