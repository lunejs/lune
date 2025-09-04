import { Tables } from '@/persistence/tables';
import { Fixture } from '@/tests/utils/fixtures';
import { ProductAssetTable } from '@/persistence/entities/product-asset';
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
