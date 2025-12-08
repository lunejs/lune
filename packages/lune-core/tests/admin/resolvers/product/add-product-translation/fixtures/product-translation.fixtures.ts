import { Locale } from '@/persistence/entities/locale';
import type { ProductTranslationTable } from '@/persistence/entities/product-translation';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ProductConstants } from './product.fixtures';
import { ShopConstants } from './shop.fixtures';

export const ProductTranslationConstants = {
  ID: TestUtils.generateUUID(),
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
        name: ProductTranslationConstants.Name,
        slug: ProductTranslationConstants.Slug,
        description: ProductTranslationConstants.Description,
        locale: Locale.EN,
        shop_id: ShopConstants.ID,
        product_id: ProductConstants.AlreadyTranslatedID
      }
    ];
  }
}
