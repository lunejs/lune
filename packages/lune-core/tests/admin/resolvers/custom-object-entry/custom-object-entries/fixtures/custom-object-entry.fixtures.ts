import type { CustomObjectEntryTable } from '@/persistence/entities/custom-object-entry';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomObjectDefinitionConstants } from './custom-object-definition.fixtures';
import { ShopConstants } from './shop.fixtures';

export const CustomObjectEntryConstants = {
  Entry1ID: TestUtils.generateUUID(),
  Entry2ID: TestUtils.generateUUID(),
  Entry3ID: TestUtils.generateUUID()
};

export class CustomObjectEntryFixtures implements Fixture<CustomObjectEntryTable> {
  table = Tables.CustomObjectEntry;

  async build(): Promise<Partial<CustomObjectEntryTable>[]> {
    return [
      {
        id: CustomObjectEntryConstants.Entry1ID,
        slug: 'entry-1',
        definition_id: CustomObjectDefinitionConstants.ID,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomObjectEntryConstants.Entry2ID,
        slug: 'entry-2',
        definition_id: CustomObjectDefinitionConstants.ID,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomObjectEntryConstants.Entry3ID,
        slug: 'entry-3',
        definition_id: CustomObjectDefinitionConstants.ID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
