import type { CollectionTable } from '@/persistence/entities/collection';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const CollectionConstants = {
  TestCollectionID: TestUtils.generateUUID()
};

export class CollectionFixtures implements Fixture<CollectionTable> {
  table: Tables = Tables.Collection;

  async build(): Promise<Partial<CollectionTable>[]> {
    return [
      {
        id: CollectionConstants.TestCollectionID,
        name: 'Test Collection',
        slug: 'test-collection',
        enabled: true,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
