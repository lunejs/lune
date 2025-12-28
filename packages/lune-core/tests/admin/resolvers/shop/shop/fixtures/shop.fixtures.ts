import type { ShopTable } from '@/persistence/entities/shop';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { UserConstants } from './user.fixtures';

const ExistingID = TestUtils.generateUUID();

export const ShopConstants = {
  ExistingID,
  ExistingSlug: 'lune-store'
};

export class ShopFixtures implements Fixture<ShopTable> {
  table: Tables = Tables.Shop;

  async build(): Promise<Partial<ShopTable>[]> {
    return [
      {
        id: ShopConstants.ExistingID,
        slug: ShopConstants.ExistingSlug,
        owner_id: UserConstants.ID
      }
    ];
  }
}
