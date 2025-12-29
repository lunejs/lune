import type { CustomFieldDefinitionTable } from '@/persistence/entities/custom-field-definition';
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
        type: 'single_line_text',
        is_list: false,
        applies_to_entity: 'option_value',
        custom_object_definition_id: CustomObjectDefinitionConstants.ColorID,
        order: 0,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.ColorHexFieldID,
        name: 'Hex',
        key: 'hex',
        type: 'color',
        is_list: false,
        applies_to_entity: 'option_value',
        custom_object_definition_id: CustomObjectDefinitionConstants.ColorID,
        order: 1,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
