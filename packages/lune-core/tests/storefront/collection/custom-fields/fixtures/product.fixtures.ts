import type { ProductTable } from '@/persistence/entities/product';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const ProductConstants = {
  // Products used as references in custom fields
  ReferencedProductID: TestUtils.generateUUID(),
  ReferencedProductSlug: 'referenced-product',
  ReferencedProductName: 'Referenced Product',

  ReferencedProduct2ID: TestUtils.generateUUID(),
  ReferencedProduct2Slug: 'referenced-product-2',
  ReferencedProduct2Name: 'Referenced Product 2',

  ReferencedProduct3ID: TestUtils.generateUUID(),
  ReferencedProduct3Slug: 'referenced-product-3',
  ReferencedProduct3Name: 'Referenced Product 3'
};

export class ProductFixtures implements Fixture<ProductTable> {
  table: Tables = Tables.Product;

  async build(): Promise<Partial<ProductTable>[]> {
    return [
      {
        id: ProductConstants.ReferencedProductID,
        slug: ProductConstants.ReferencedProductSlug,
        name: ProductConstants.ReferencedProductName,
        shop_id: ShopConstants.ID
      },
      {
        id: ProductConstants.ReferencedProduct2ID,
        slug: ProductConstants.ReferencedProduct2Slug,
        name: ProductConstants.ReferencedProduct2Name,
        shop_id: ShopConstants.ID
      },
      {
        id: ProductConstants.ReferencedProduct3ID,
        slug: ProductConstants.ReferencedProduct3Slug,
        name: ProductConstants.ReferencedProduct3Name,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
