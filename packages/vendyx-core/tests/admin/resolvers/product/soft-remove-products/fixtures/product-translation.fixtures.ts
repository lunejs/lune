import type { ProductTranslationTable } from '@/persistence/entities/product-translation';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { ProductConstants } from './product.fixtures';
import { ShopConstants } from './shop.fixtures';

export const ProductTranslationConstants = {
  ID: TestHelper.generateUUID(),
  Name: 'MacBook Pro 16',
  Slug: 'mac-pro-16',
  Description: 'The best computer ever made'
};

export class ProductTranslationFixtures implements Fixture<ProductTranslationTable> {
  table: Tables = Tables.ProductTranslation;

  async build(): Promise<Partial<ProductTranslationTable>[]> {
    return [
      {
        id: ProductTranslationConstants.ID,
        shop_id: ShopConstants.ID,
        product_id: ProductConstants.ShirtID
      }
    ];
  }
}
