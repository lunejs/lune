import { Tables } from '@/persistence/tables';
import { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';
import { ShopConstants } from './shop.fixtures';
import { AssetTable } from '@/persistence/entities/asset';

export const AssetConstants = {
  ImageID: TestHelper.generateUUID(),
  MeImageID: TestHelper.generateUUID(),
  AlreadyStoredImageID: TestHelper.generateUUID()
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
        id: AssetConstants.AlreadyStoredImageID,
        name: 'AlreadyStored.jpg',
        source: '',
        type: 'IMG',
        provider_id: '',
        shop_id: ShopConstants.ID
      }
    ];
  }
}
