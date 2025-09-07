import { ShopTable } from '@/persistence/entities/shop';
import { Tables } from '@/persistence/tables';
import { Fixture } from '@/tests/utils/fixtures';

import { UserConstants } from './user.fixtures';

export class ShopFixtures implements Fixture<ShopTable> {
  table: Tables = Tables.Shop;

  async build(): Promise<Partial<ShopTable>[]> {
    return [
      {
        owner_id: UserConstants.ID
      },
      {
        owner_id: UserConstants.ID
      },
      {
        owner_id: UserConstants.ID
      }
    ];
  }
}
