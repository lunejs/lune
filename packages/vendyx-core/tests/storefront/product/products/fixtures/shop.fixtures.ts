import { ShopTable } from '@/persistence/entities/shop';
import { Tables } from '@/persistence/tables';
import { Fixture } from '@/tests/utils/fixtures';

import { UserConstants } from './user.fixtures';

export const ShopConstants = {
  ID: crypto.randomUUID(),
  StorefrontApiKey: crypto.randomUUID()
};

export class ShopFixtures implements Fixture<ShopTable> {
  table: Tables = Tables.Shop;

  async build(): Promise<Partial<ShopTable>[]> {
    return [
      {
        id: ShopConstants.ID,
        storefront_api_key: ShopConstants.StorefrontApiKey,
        owner_id: UserConstants.ID
      }
    ];
  }
}
