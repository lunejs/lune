import { ProductTagTable } from '@/persistence/entities/product-tag';
import { Tables } from '@/persistence/tables';
import { Fixture } from '@/tests/utils/fixtures';
import { ProductConstants } from './product.fixtures';
import { TagConstants } from './tag.fixtures';

export class ProductTagFixtures implements Fixture<ProductTagTable> {
  table: Tables = Tables.ProductTag;

  async build(): Promise<Partial<ProductTagTable>[]> {
    return [
      {
        product_id: ProductConstants.MacBookPro16ID,
        tag_id: TagConstants.ElectronicsID
      },
      {
        product_id: ProductConstants.iPhone14ProMaxID,
        tag_id: TagConstants.ElectronicsID
      },
      {
        product_id: ProductConstants.AppleWatchSeries8ID,
        tag_id: TagConstants.ElectronicsID
      },
      {
        product_id: ProductConstants.AirPodsPro2ndGenID,
        tag_id: TagConstants.ElectronicsID
      },
      {
        product_id: ProductConstants.ShirtID,
        tag_id: TagConstants.ClothingID
      },
      {
        product_id: ProductConstants.JeansID,
        tag_id: TagConstants.ClothingID
      },
      {
        product_id: ProductConstants.JacketID,
        tag_id: TagConstants.ClothingID
      },
      {
        product_id: ProductConstants.SneakersID,
        tag_id: TagConstants.ClothingID
      },
      {
        product_id: ProductConstants.BeachShirtID,
        tag_id: TagConstants.ClothingID
      }
    ];
  }
}
