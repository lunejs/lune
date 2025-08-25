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
        product_id: ProductConstants.ID,
        tag_id: TagConstants.DomesticsID
      }
    ];
  }
}
