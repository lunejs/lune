import type { CustomFieldDefinitionTable } from '@/persistence/entities/custom-field-definition';
import {
  CustomFieldAppliesTo,
  CustomFieldType
} from '@/persistence/entities/custom-field-definition';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomObjectDefinitionConstants } from './custom-object-definition.fixtures';
import { ShopConstants } from './shop.fixtures';

export const CustomFieldDefinitionConstants = {
  ColorNameFieldID: TestUtils.generateUUID(),
  ColorHexFieldID: TestUtils.generateUUID()
};

export class CustomFieldDefinitionFixtures implements Fixture<CustomFieldDefinitionTable> {
  table: Tables = Tables.CustomFieldDefinition;

  async build(): Promise<Partial<CustomFieldDefinitionTable>[]> {
    return [
      {
        id: CustomFieldDefinitionConstants.ColorNameFieldID,
        name: 'Name',
        key: 'name',
        type: CustomFieldType.SingleLineText,
        is_list: false,
        applies_to_entity: CustomFieldAppliesTo.OptionValue,
        order: 0,
        custom_object_definition_id: CustomObjectDefinitionConstants.ColorDefinitionID,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.ColorHexFieldID,
        name: 'Hex',
        key: 'hex',
        type: CustomFieldType.Color,
        is_list: false,
        applies_to_entity: CustomFieldAppliesTo.OptionValue,
        order: 1,
        custom_object_definition_id: CustomObjectDefinitionConstants.ColorDefinitionID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
