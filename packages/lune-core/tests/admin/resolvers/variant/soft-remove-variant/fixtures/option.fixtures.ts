import type { OptionTable } from '@/persistence/entities/option';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ProductConstants } from './product.fixtures';
import { ShopConstants } from './shop.fixtures';

export const OptionConstants = {
  ColorOptionID: TestUtils.generateUUID(),
  SizeOptionID: TestUtils.generateUUID(),
  MaterialOptionId: TestUtils.generateUUID()
};

export class OptionFixtures implements Fixture<OptionTable> {
  table: Tables = Tables.Option;

  async build(): Promise<Partial<OptionTable>[]> {
    return [
      {
        id: OptionConstants.ColorOptionID,
        product_id: ProductConstants.ID,
        name: 'Color',
        shop_id: ShopConstants.ID
      },
      {
        id: OptionConstants.SizeOptionID,
        product_id: ProductConstants.ID,
        name: 'Size',
        shop_id: ShopConstants.ID
      },
      {
        id: OptionConstants.MaterialOptionId,
        product_id: ProductConstants.ID,
        name: 'Material',
        shop_id: ShopConstants.ID
      }
    ];
  }
}
