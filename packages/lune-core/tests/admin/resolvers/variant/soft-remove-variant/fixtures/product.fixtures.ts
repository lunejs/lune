import { subMinutes } from 'date-fns';

import { convertToCent } from '@lune/common';

import type { ProductTable } from '@/persistence/entities/product';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

const TODAY = new Date();

export const ProductConstants = {
  ID: TestUtils.generateUUID()
};

export class ProductFixtures implements Fixture<ProductTable> {
  table: Tables = Tables.Product;

  async build(): Promise<Partial<ProductTable>[]> {
    return [
      {
        created_at: subMinutes(TODAY, 120),
        id: ProductConstants.ID,
        name: 'Casual Shirt',
        enabled: true,
        min_sale_price: convertToCent(20),
        max_sale_price: convertToCent(50),
        shop_id: ShopConstants.ID
      }
    ];
  }
}
