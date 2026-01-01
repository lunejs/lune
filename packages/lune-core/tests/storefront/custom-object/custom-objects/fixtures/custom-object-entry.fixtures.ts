import type { CustomObjectEntryTable } from '@/persistence/entities/custom-object-entry';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomObjectDefinitionConstants } from './custom-object-definition.fixtures';
import { ShopConstants } from './shop.fixtures';

export const CustomObjectEntryConstants = {
  FirstEntryID: TestUtils.generateUUID(),
  FirstEntrySlug: 'first-blog-post',

  SecondEntryID: TestUtils.generateUUID(),
  SecondEntrySlug: 'second-blog-post'
};

export class CustomObjectEntryFixtures implements Fixture<CustomObjectEntryTable> {
  table: Tables = Tables.CustomObjectEntry;

  async build(): Promise<Partial<CustomObjectEntryTable>[]> {
    return [
      {
        id: CustomObjectEntryConstants.FirstEntryID,
        slug: CustomObjectEntryConstants.FirstEntrySlug,
        definition_id: CustomObjectDefinitionConstants.ID,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomObjectEntryConstants.SecondEntryID,
        slug: CustomObjectEntryConstants.SecondEntrySlug,
        definition_id: CustomObjectDefinitionConstants.ID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
