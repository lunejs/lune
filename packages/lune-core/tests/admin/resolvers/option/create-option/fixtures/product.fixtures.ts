import { convertToCent } from '@lune/common';

import type { ProductTable } from '@/persistence/entities/product';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { ShopConstants } from './shop.fixtures';

export const ProductConstants = {
  ID: TestHelper.generateUUID(),
  WithNoOptions: TestHelper.generateUUID()
};

export class ProductFixtures implements Fixture<ProductTable> {
  table: Tables = Tables.Product;

  async build(): Promise<Partial<ProductTable>[]> {
    return [
      {
        created_at: new Date(),
        id: ProductConstants.ID,
        name: 'MacBook Pro 16',
        enabled: true,
        min_sale_price: convertToCent(23_000),
        max_sale_price: convertToCent(32_000),
        shop_id: ShopConstants.ID
      },
      {
        created_at: new Date(),
        id: ProductConstants.WithNoOptions,
        name: 'MacBook Pro 16',
        enabled: true,
        min_sale_price: convertToCent(23_000),
        max_sale_price: convertToCent(32_000),
        shop_id: ShopConstants.ID
      }
    ];
  }
}
