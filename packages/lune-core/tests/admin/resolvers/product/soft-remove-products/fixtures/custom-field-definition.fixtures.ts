import type { CustomFieldDefinitionTable } from '@/persistence/entities/custom-field-definition';
import {
  CustomFieldAppliesTo,
  CustomFieldType
} from '@/persistence/entities/custom-field-definition';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const CustomFieldDefinitionConstants = {
  MaterialID: TestUtils.generateUUID(),
  MaterialKey: 'material'
};

export class CustomFieldDefinitionFixtures implements Fixture<CustomFieldDefinitionTable> {
  table: Tables = Tables.CustomFieldDefinition;

  async build(): Promise<Partial<CustomFieldDefinitionTable>[]> {
    return [
      {
        id: CustomFieldDefinitionConstants.MaterialID,
        key: CustomFieldDefinitionConstants.MaterialKey,
        name: 'Material',
        is_list: false,
        applies_to_entity: CustomFieldAppliesTo.Product,
        type: CustomFieldType.SingleLineText,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
