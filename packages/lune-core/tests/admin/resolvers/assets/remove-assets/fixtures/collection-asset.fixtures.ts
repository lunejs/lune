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
        asset_id: AssetConstants.Image2ID,
        collection_id: CollectionConstants.CollectionID,
        order: 0
      }
    ];
  }
}
