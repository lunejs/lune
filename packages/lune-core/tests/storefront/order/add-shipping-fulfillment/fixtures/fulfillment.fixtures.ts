import { LunePrice } from '@lune/common';

import type { FulfillmentTable } from '@/persistence/entities/fulfillment';
import { FulfillmentType } from '@/persistence/entities/fulfillment';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { OrderConstants } from './order.fixtures';
import { ShopConstants } from './shop.fixtures';

export const FulfillmentConstants = {
  ID: TestHelper.generateUUID()
};

export class FulfillmentFixtures implements Fixture<FulfillmentTable> {
  table: Tables = Tables.Fulfillment;

  async build(): Promise<Partial<FulfillmentTable>[]> {
    return [
      {
        id: FulfillmentConstants.ID,
        amount: LunePrice.toCent(50),
        order_id: OrderConstants.WithFulfillmentID,
        shop_id: ShopConstants.ID,
        type: FulfillmentType.SHIPPING
      }
    ];
  }
}
