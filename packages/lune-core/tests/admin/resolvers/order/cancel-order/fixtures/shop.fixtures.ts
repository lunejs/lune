import type { ShopTable } from '@/persistence/entities/shop';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { UserConstants } from './user.fixtures';

export const ShopConstants = {
  ID: TestUtils.generateUUID(),
  Slug: 'test-shop'
};

export class ShopFixtures implements Fixture<ShopTable> {
  table: Tables = Tables.Shop;

  async build(): Promise<Partial<ShopTable>[]> {
    return [
      {
        id: ShopConstants.ID,
        name: 'Test Shop',
        slug: ShopConstants.Slug,
        owner_id: UserConstants.ID
      }
    ];
  }
}
