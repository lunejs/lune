import type { CustomObjectEntryTable } from '@/persistence/entities/custom-object-entry';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomObjectDefinitionConstants } from './custom-object-definition.fixtures';
import { ShopConstants } from './shop.fixtures';

export const CustomObjectEntryConstants = {
  ExistingID: TestUtils.generateUUID(),
  ExistingSlug: 'existing-entry',
  ExistingTitle: 'Existing Entry'
};

export class CustomObjectEntryFixtures implements Fixture<CustomObjectEntryTable> {
  table = Tables.CustomObjectEntry;

  async build(): Promise<Partial<CustomObjectEntryTable>[]> {
    return [
      {
        id: CustomObjectEntryConstants.ExistingID,
        slug: CustomObjectEntryConstants.ExistingSlug,
        definition_id: CustomObjectDefinitionConstants.WithDisplayFieldID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
