import { TagTable } from '@/persistence/entities/tag';
import { Tables } from '@/persistence/tables';
import { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { ShopConstants } from './shop.fixtures';

export const TagConstants = {
  ElectronicsID: TestHelper.generateUUID(),
  DomesticsID: TestHelper.generateUUID(),
  ClothingID: TestHelper.generateUUID()
};

export class TagFixtures implements Fixture<TagTable> {
  table: Tables = Tables.Tag;

  async build(): Promise<Partial<TagTable>[]> {
    return [
      {
        id: TagConstants.ElectronicsID,
        name: 'electronics',
        shop_id: ShopConstants.ID
      },
      {
        id: TagConstants.DomesticsID,
        name: 'domestics',
        shop_id: ShopConstants.ID
      },
      {
        id: TagConstants.ClothingID,
        name: 'clothing',
        shop_id: ShopConstants.ID
      }
    ];
  }
}
