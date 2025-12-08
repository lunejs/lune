import type { AssetTable } from '@/persistence/entities/asset';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const AssetConstants = {
  ImageID: TestUtils.generateUUID(),
  MeImageID: TestUtils.generateUUID(),
  EllieImageID: TestUtils.generateUUID(),
  RainImageID: TestUtils.generateUUID()
};

export class AssetFixtures implements Fixture<AssetTable> {
  table: Tables = Tables.Asset;

  async build(): Promise<Partial<AssetTable>[]> {
    return [
      {
        id: AssetConstants.ImageID,
        filename: 'Image.jpg',
        source: '',
        ext: 'jpg',
        mime_type: 'image/jpeg',
        provider_id: '',
        shop_id: ShopConstants.ID
      },
      {
        id: AssetConstants.MeImageID,
        filename: 'Me.jpg',
        source: '',
        ext: 'jpg',
        mime_type: 'image/jpeg',
        provider_id: '',
        shop_id: ShopConstants.ID
      },
      {
        id: AssetConstants.EllieImageID,
        filename: 'Ellie.jpg',
        source: '',
        ext: 'jpg',
        mime_type: 'image/jpeg',
        provider_id: '',
        shop_id: ShopConstants.ID
      },
      {
        id: AssetConstants.RainImageID,
        filename: 'Rain.jpg',
        source: '',
        ext: 'jpg',
        mime_type: 'image/jpeg',
        provider_id: '',
        shop_id: ShopConstants.ID
      }
    ];
  }
}
