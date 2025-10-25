import type { ProductAssetTable } from '@/persistence/entities/product-asset';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';

import { AssetConstants } from './asset.fixtures';
import { ProductConstants } from './product.fixtures';

export class ProductAssetFixtures implements Fixture<ProductAssetTable> {
  table: Tables = Tables.ProductAsset;

  async build(): Promise<Partial<ProductAssetTable>[]> {
    return [
      {
        asset_id: AssetConstants.AlreadyStoredImageID,
        product_id: ProductConstants.ID,
        order: 0
      }
    ];
  }
}
