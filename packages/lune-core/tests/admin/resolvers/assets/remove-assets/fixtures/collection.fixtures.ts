import type { CollectionTable } from '@/persistence/entities/collection';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const CollectionConstants = {
  CollectionID: TestUtils.generateUUID()
};

export class CollectionFixtures implements Fixture<CollectionTable> {
  table: Tables = Tables.Collection;

  async build(): Promise<Partial<CollectionTable>[]> {
    return [
      {
        id: CollectionConstants.CollectionID,
        name: 'Collection with assets',
        content_type: 'PRODUCTS' as any,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
