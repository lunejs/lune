import { ProductTranslationTable } from '@/persistence/entities/product-translation';
import { Tables } from '@/persistence/tables';
import { Fixture } from '@/tests/utils/fixtures';

import { ProductConstants } from './product.fixtures';
import { ShopConstants } from './shop.fixtures';

export class ProductTranslationFixtures implements Fixture<ProductTranslationTable> {
  table: Tables = Tables.ProductTranslation;

  async build(): Promise<Partial<ProductTranslationTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        product_id: ProductConstants.ShirtID
      },
      {
        shop_id: ShopConstants.ID,
        product_id: ProductConstants.JacketID
      }
    ];
  }
}
