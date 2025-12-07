import type { OptionTable } from '@/persistence/entities/option';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { ProductConstants } from './product.fixtures';
import { ShopConstants } from './shop.fixtures';

export const OptionConstants = {
  SizeOptionID: TestHelper.generateUUID()
};

export class OptionFixtures implements Fixture<OptionTable> {
  table: Tables = Tables.Option;

  async build(): Promise<Partial<OptionTable>[]> {
    return [
      {
        id: OptionConstants.SizeOptionID,
        product_id: ProductConstants.ShirtID,
        name: 'Size',
        shop_id: ShopConstants.ID
      }
    ];
  }
}
