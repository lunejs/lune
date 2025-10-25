import type { ProductTagTable } from '@/persistence/entities/product-tag';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';

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
        product_id: ProductConstants.MacBookPro16ID,
        tag_id: TagConstants.ClothingID
      },
      {
        product_id: ProductConstants.MacBookPro16ID,
        tag_id: TagConstants.DomesticsID
      }
    ];
  }
}
