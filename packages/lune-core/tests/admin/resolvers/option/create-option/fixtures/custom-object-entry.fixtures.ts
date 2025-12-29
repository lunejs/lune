import type { CustomObjectEntryTable } from '@/persistence/entities/custom-object-entry';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomObjectDefinitionConstants } from './custom-object-definition.fixtures';
import { ShopConstants } from './shop.fixtures';

export const CustomObjectEntryConstants = {
  RedEntryID: TestUtils.generateUUID(),
  BlueEntryID: TestUtils.generateUUID(),
  GreenEntryID: TestUtils.generateUUID()
};

export class CustomObjectEntryFixtures implements Fixture<CustomObjectEntryTable> {
  table: Tables = Tables.CustomObjectEntry;

  async build(): Promise<Partial<CustomObjectEntryTable>[]> {
    return [
      {
        id: CustomObjectEntryConstants.RedEntryID,
        slug: 'red',
        definition_id: CustomObjectDefinitionConstants.ColorDefinitionID,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomObjectEntryConstants.BlueEntryID,
        slug: 'blue',
        definition_id: CustomObjectDefinitionConstants.ColorDefinitionID,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomObjectEntryConstants.GreenEntryID,
        slug: 'green',
        definition_id: CustomObjectDefinitionConstants.ColorDefinitionID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
