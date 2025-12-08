import { subMinutes } from 'date-fns';

import type { AssetTable } from '@/persistence/entities/asset';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const AssetConstants = {
  ImageID: TestUtils.generateUUID(),
  MeImageID: TestUtils.generateUUID(),
  JoelImageID: TestUtils.generateUUID(),
  EllieImageID: TestUtils.generateUUID(),
  ElizabethID: TestUtils.generateUUID(),
  ElixirID: TestUtils.generateUUID()
};

const TODAY = new Date();

export class AssetFixtures implements Fixture<AssetTable> {
  table: Tables = Tables.Asset;

  async build(): Promise<Partial<AssetTable>[]> {
    return [
      {
        id: AssetConstants.ImageID,
        created_at: subMinutes(TODAY, 30),
        filename: 'Image.jpg',
        source: '',
        ext: 'jpg',
        mime_type: 'image/jpeg',
        provider_id: '',
        shop_id: ShopConstants.ID
      },
      {
        id: AssetConstants.MeImageID,
        created_at: subMinutes(TODAY, 60),
        filename: 'Me.jpg',
        source: '',
        ext: 'jpg',
        mime_type: 'image/jpeg',
        provider_id: '',
        shop_id: ShopConstants.ID
      },
      {
        id: AssetConstants.JoelImageID,
        created_at: subMinutes(TODAY, 90),
        filename: 'Joel.jpg',
        source: '',
        ext: 'jpg',
        mime_type: 'image/jpeg',
        provider_id: '',
        shop_id: ShopConstants.ID
      },
      {
        id: AssetConstants.EllieImageID,
        created_at: subMinutes(TODAY, 120),
        filename: 'Ellie.jpg',
        source: '',
        ext: 'jpg',
        mime_type: 'image/jpeg',
        provider_id: '',
        shop_id: ShopConstants.ID
      },
      {
        id: AssetConstants.ElizabethID,
        created_at: subMinutes(TODAY, 120),
        filename: 'Elizabeth.jpg',
        source: '',
        ext: 'jpg',
        mime_type: 'image/jpeg',
        provider_id: '',
        shop_id: ShopConstants.ID
      },
      {
        id: AssetConstants.ElixirID,
        created_at: subMinutes(TODAY, 120),
        filename: 'elixir.jpg',
        source: '',
        ext: 'jpg',
        mime_type: 'image/jpeg',
        provider_id: '',
        shop_id: ShopConstants.ID
      }
    ];
  }
}
