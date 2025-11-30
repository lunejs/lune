import type { ShopTable } from '@/persistence/entities/shop';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { UserConstants } from './user.fixtures';

export const ShopConstants = {
  ID: TestHelper.generateUUID()
};

export class ShopFixtures implements Fixture<ShopTable> {
  table: Tables = Tables.Shop;

  async build(): Promise<Partial<ShopTable>[]> {
    return [
      {
        id: ShopConstants.ID,
        owner_id: UserConstants.ID
      }
    ];
  }
}
