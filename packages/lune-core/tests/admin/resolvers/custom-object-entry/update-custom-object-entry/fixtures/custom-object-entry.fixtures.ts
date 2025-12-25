import type { CustomObjectEntryTable } from '@/persistence/entities/custom-object-entry';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomObjectDefinitionConstants } from './custom-object-definition.fixtures';
import { ShopConstants } from './shop.fixtures';

export const CustomObjectEntryConstants = {
  ID: TestUtils.generateUUID(),
  Slug: 'existing-entry'
};

export class CustomObjectEntryFixtures implements Fixture<CustomObjectEntryTable> {
  table = Tables.CustomObjectEntry;

  async build(): Promise<Partial<CustomObjectEntryTable>[]> {
    return [
      {
        id: CustomObjectEntryConstants.ID,
        slug: CustomObjectEntryConstants.Slug,
        definition_id: CustomObjectDefinitionConstants.ID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
