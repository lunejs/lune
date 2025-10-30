import type { CollectionAssetTable } from '@/persistence/entities/collection-asset';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';

import { AssetConstants } from './asset.fixtures';
import { CollectionConstants } from './collection.fixtures';

export class CollectionAssetFixtures implements Fixture<CollectionAssetTable> {
  table: Tables = Tables.CollectionAsset;

  async build(): Promise<Partial<CollectionAssetTable>[]> {
    return [
      {
        asset_id: AssetConstants.EllieImageID,
        collection_id: CollectionConstants.EllieCollection,
        order: 0
      },
      {
        asset_id: AssetConstants.ImageID,
        collection_id: CollectionConstants.EllieCollection,
        order: 1
      },

      {
        asset_id: AssetConstants.JoelImageID,
        collection_id: CollectionConstants.JoelCollection,
        order: 0
      },
      {
        asset_id: AssetConstants.MeImageID,
        collection_id: CollectionConstants.JoelCollection,
        order: 1
      }
    ];
  }
}
