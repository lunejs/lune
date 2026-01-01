import type { CustomObjectEntryTable } from '@/persistence/entities/custom-object-entry';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomObjectDefinitionConstants } from './custom-object-definition.fixtures';
import { ShopConstants } from './shop.fixtures';

export const CustomObjectEntryConstants = {
  ReferencedEntryID: TestUtils.generateUUID(),
  ReferencedEntrySlug: 'john-doe',

  ReferencedEntry2ID: TestUtils.generateUUID(),
  ReferencedEntry2Slug: 'jane-smith',

  ReferencedEntry3ID: TestUtils.generateUUID(),
  ReferencedEntry3Slug: 'bob-johnson'
};

export class CustomObjectEntryFixtures implements Fixture<CustomObjectEntryTable> {
  table: Tables = Tables.CustomObjectEntry;

  async build(): Promise<Partial<CustomObjectEntryTable>[]> {
    return [
      {
        id: CustomObjectEntryConstants.ReferencedEntryID,
        slug: CustomObjectEntryConstants.ReferencedEntrySlug,
        definition_id: CustomObjectDefinitionConstants.ID,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomObjectEntryConstants.ReferencedEntry2ID,
        slug: CustomObjectEntryConstants.ReferencedEntry2Slug,
        definition_id: CustomObjectDefinitionConstants.ID,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomObjectEntryConstants.ReferencedEntry3ID,
        slug: CustomObjectEntryConstants.ReferencedEntry3Slug,
        definition_id: CustomObjectDefinitionConstants.ID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
