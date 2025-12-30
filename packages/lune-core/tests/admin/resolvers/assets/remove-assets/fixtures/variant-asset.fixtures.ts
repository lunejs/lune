import type { VariantAssetTable } from '@/persistence/entities/variant-asset';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';

import { AssetConstants } from './asset.fixtures';
import { VariantConstants } from './variant.fixtures';

export class VariantAssetFixtures implements Fixture<VariantAssetTable> {
  table: Tables = Tables.VariantAsset;

  async build(): Promise<Partial<VariantAssetTable>[]> {
    return [
      {
        asset_id: AssetConstants.Image3ID,
        variant_id: VariantConstants.VariantID,
        order: 0
      }
    ];
  }
}
