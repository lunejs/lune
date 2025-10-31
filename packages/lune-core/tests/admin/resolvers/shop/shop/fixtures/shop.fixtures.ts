import type { ShopTable } from '@/persistence/entities/shop';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';

import { UserConstants } from './user.fixtures';

export const ShopConstants = {
  ExistingSlug: 'lune-store'
};

export class ShopFixtures implements Fixture<ShopTable> {
  table: Tables = Tables.Shop;

  async build(): Promise<Partial<ShopTable>[]> {
    return [
      {
        slug: ShopConstants.ExistingSlug,
        owner_id: UserConstants.ID
      }
    ];
  }
}
