import type { CustomFieldDefinitionTable } from '@/persistence/entities/custom-field-definition';
import { CustomFieldType } from '@/persistence/entities/custom-field-definition';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const CustomFieldDefinitionConstants = {
  BrandID: TestUtils.generateUUID(),
  BrandKey: 'brand',
  MaterialID: TestUtils.generateUUID(),
  MaterialKey: 'material',
  WeightID: TestUtils.generateUUID(),
  WeightKey: 'weight',
  IsOrganicID: TestUtils.generateUUID(),
  IsOrganicKey: 'is_organic'
};

export class CustomFieldDefinitionFixtures implements Fixture<CustomFieldDefinitionTable> {
  table: Tables = Tables.CustomFieldDefinition;

  async build(): Promise<Partial<CustomFieldDefinitionTable>[]> {
    return [
      {
        id: CustomFieldDefinitionConstants.BrandID,
        name: 'Brand',
        key: CustomFieldDefinitionConstants.BrandKey,
        is_list: false,
        applies_to_entity: 'product',
        type: CustomFieldType.SingleLineText,
        metadata: null,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.MaterialID,
        name: 'Material',
        key: CustomFieldDefinitionConstants.MaterialKey,
        is_list: true,
        applies_to_entity: 'product',
        type: CustomFieldType.SingleLineText,
        metadata: null,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.WeightID,
        name: 'Weight',
        key: CustomFieldDefinitionConstants.WeightKey,
        is_list: false,
        applies_to_entity: 'product',
        type: CustomFieldType.Integer,
        metadata: null,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.IsOrganicID,
        name: 'Is Organic',
        key: CustomFieldDefinitionConstants.IsOrganicKey,
        is_list: false,
        applies_to_entity: 'product',
        type: CustomFieldType.Boolean,
        metadata: null,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
