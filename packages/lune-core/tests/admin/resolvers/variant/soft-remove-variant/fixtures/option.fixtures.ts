import type { OptionTable } from '@/persistence/entities/option';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { ProductConstants } from './product.fixtures';
import { ShopConstants } from './shop.fixtures';

export const OptionConstants = {
  ColorOptionID: TestHelper.generateUUID(),
  SizeOptionID: TestHelper.generateUUID(),
  MaterialOptionId: TestHelper.generateUUID()
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
