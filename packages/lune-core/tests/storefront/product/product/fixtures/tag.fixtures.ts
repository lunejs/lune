import type { TagTable } from '@/persistence/entities/tag';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const TagConstants = {
  ElectronicsID: TestUtils.generateUUID(),
  DomesticsID: TestUtils.generateUUID(),
  ClothingID: TestUtils.generateUUID()
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
