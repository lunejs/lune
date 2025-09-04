import { ShopTable } from '@/persistence/entities/shop';
import { Tables } from '@/persistence/tables';
import { Fixture } from '@/tests/utils/fixtures';
import { UserConstants } from './user.fixtures';

export const ShopConstants = {
  ExistingSlug: 'vendyx-store'
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
