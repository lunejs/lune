import type { ShopTable } from '@/persistence/entities/shop';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';

import { UserConstants } from './user.fixtures';

export const ShopConstants = {
  ExistingEmail: 'acme@store.com'
};

export class ShopFixtures implements Fixture<ShopTable> {
  table: Tables = Tables.Shop;

  async build(): Promise<Partial<ShopTable>[]> {
    return [
      {
        email: ShopConstants.ExistingEmail,
        owner_id: UserConstants.ID
      }
    ];
  }
}
