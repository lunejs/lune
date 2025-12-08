import type { CollectionTable } from '@/persistence/entities/collection';
import { CollectionContentType } from '@/persistence/entities/collection';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const CollectionConstants = {
  ElectronicsCollectionID: TestUtils.generateUUID(),
  ClothingCollectionID: TestUtils.generateUUID()
};

export class CollectionFixtures implements Fixture<CollectionTable> {
  table: Tables = Tables.Collection;

  async build(): Promise<Partial<CollectionTable>[]> {
    return [
      {
        id: CollectionConstants.ElectronicsCollectionID,
        shop_id: ShopConstants.ID,
        name: 'Electronics',
        enabled: true,
        content_type: CollectionContentType.Products,
        order: 0
      },
      {
        id: CollectionConstants.ClothingCollectionID,
        shop_id: ShopConstants.ID,
        name: 'Clothing',
        enabled: true,
        content_type: CollectionContentType.Products,
        order: 1
      }
    ];
  }
}
