import type { CustomObjectEntryValueTable } from '@/persistence/entities/custom-object-entry-value';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';

import { CustomFieldDefinitionConstants } from './custom-field-definition.fixtures';
import { CustomObjectEntryConstants } from './custom-object-entry.fixtures';
import { ShopConstants } from './shop.fixtures';

export class CustomObjectEntryValueFixtures implements Fixture<CustomObjectEntryValueTable> {
  table: Tables = Tables.CustomObjectEntryValue;

  async build(): Promise<Partial<CustomObjectEntryValueTable>[]> {
    return [
      // Red entry values
      {
        value: JSON.stringify('Red'),
        entry_id: CustomObjectEntryConstants.RedEntryID,
        field_id: CustomFieldDefinitionConstants.ColorNameFieldID,
        shop_id: ShopConstants.ID
      },
      {
        value: JSON.stringify('#FF0000'),
        entry_id: CustomObjectEntryConstants.RedEntryID,
        field_id: CustomFieldDefinitionConstants.ColorHexFieldID,
        shop_id: ShopConstants.ID
      },
      // Blue entry values
      {
        value: JSON.stringify('Blue'),
        entry_id: CustomObjectEntryConstants.BlueEntryID,
        field_id: CustomFieldDefinitionConstants.ColorNameFieldID,
        shop_id: ShopConstants.ID
      },
      {
        value: JSON.stringify('#0000FF'),
        entry_id: CustomObjectEntryConstants.BlueEntryID,
        field_id: CustomFieldDefinitionConstants.ColorHexFieldID,
        shop_id: ShopConstants.ID
      },
      // Green entry values
      {
        value: JSON.stringify('Green'),
        entry_id: CustomObjectEntryConstants.GreenEntryID,
        field_id: CustomFieldDefinitionConstants.ColorNameFieldID,
        shop_id: ShopConstants.ID
      },
      {
        value: JSON.stringify('#00FF00'),
        entry_id: CustomObjectEntryConstants.GreenEntryID,
        field_id: CustomFieldDefinitionConstants.ColorHexFieldID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
