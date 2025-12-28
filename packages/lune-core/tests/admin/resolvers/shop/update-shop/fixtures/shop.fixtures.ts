import type { ShopTable } from '@/persistence/entities/shop';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { UserConstants } from './user.fixtures';

const ExistingID = TestUtils.generateUUID();
const OtherShopID = TestUtils.generateUUID();

export const ShopConstants = {
  ExistingID,
  ExistingEmail: 'lune@store.com',
  ExistingName: 'Lune Store',
  OtherShopID,
  OtherShopEmail: 'acme@store.com' // For email conflict tests
};

export class ShopFixtures implements Fixture<ShopTable> {
  table: Tables = Tables.Shop;

  async build(): Promise<Partial<ShopTable>[]> {
    return [
      {
        id: ShopConstants.ExistingID,
        name: ShopConstants.ExistingName,
        email: ShopConstants.ExistingEmail,
        owner_id: UserConstants.ID
      },
      {
        id: ShopConstants.OtherShopID,
        name: 'Acme Store',
        email: ShopConstants.OtherShopEmail,
        owner_id: UserConstants.ID
      }
    ];
  }
}
