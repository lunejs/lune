import type { AssetTable } from '@/persistence/entities/asset';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const AssetConstants = {
  ImageID: TestUtils.generateUUID(),
  Image2ID: TestUtils.generateUUID(),
  Image3ID: TestUtils.generateUUID()
};

export class AssetFixtures implements Fixture<AssetTable> {
  table: Tables = Tables.Asset;

  async build(): Promise<Partial<AssetTable>[]> {
    return [
      {
        id: AssetConstants.ImageID,
        filename: 'image1.jpg',
        source: '',
        ext: 'jpg',
        mime_type: 'image/jpeg',
        provider_id: '',
        shop_id: ShopConstants.ID,
        size: 1024
      },
      {
        id: AssetConstants.Image2ID,
        filename: 'image2.jpg',
        source: '',
        ext: 'jpg',
        mime_type: 'image/jpeg',
        provider_id: '',
        shop_id: ShopConstants.ID,
        size: 2048
      },
      {
        id: AssetConstants.Image3ID,
        filename: 'image3.jpg',
        source: '',
        ext: 'jpg',
        mime_type: 'image/jpeg',
        provider_id: '',
        shop_id: ShopConstants.ID,
        size: 3072
      }
    ];
  }
}
