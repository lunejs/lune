import type { AssetTable } from '@/persistence/entities/asset';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { ShopConstants } from './shop.fixtures';

export const AssetConstants = {
  ImageID: TestHelper.generateUUID(),
  MeImageID: TestHelper.generateUUID(),
  JoelImageID: TestHelper.generateUUID(),
  EllieImageID: TestHelper.generateUUID()
};

export class AssetFixtures implements Fixture<AssetTable> {
  table: Tables = Tables.Asset;

  async build(): Promise<Partial<AssetTable>[]> {
    return [
      {
        id: AssetConstants.ImageID,
        name: 'Image.jpg',
        source: '',
        type: 'IMG',
        provider_id: '',
        shop_id: ShopConstants.ID
      },
      {
        id: AssetConstants.MeImageID,
        name: 'Me.jpg',
        source: '',
        type: 'IMG',
        provider_id: '',
        shop_id: ShopConstants.ID
      },
      {
        id: AssetConstants.JoelImageID,
        name: 'Joel.jpg',
        source: '',
        type: 'IMG',
        provider_id: '',
        shop_id: ShopConstants.ID
      },
      {
        id: AssetConstants.EllieImageID,
        name: 'Ellie.jpg',
        source: '',
        type: 'IMG',
        provider_id: '',
        shop_id: ShopConstants.ID
      }
    ];
  }
}
