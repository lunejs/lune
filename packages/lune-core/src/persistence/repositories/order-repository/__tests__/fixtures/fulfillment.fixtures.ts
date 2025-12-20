import { LunePrice } from '@lune/common';

import type { FulfillmentTable } from '@/persistence/entities/fulfillment';
import { FulfillmentType } from '@/persistence/entities/fulfillment';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderConstants } from './order.fixtures';
import { ShopConstants } from './shop.fixtures';

export const FulfillmentConstants = {
  ID: TestUtils.generateUUID(),
  InStorePickupID: TestUtils.generateUUID()
};

export class FulfillmentFixtures implements Fixture<FulfillmentTable> {
  table: Tables = Tables.Fulfillment;

  async build(): Promise<Partial<FulfillmentTable>[]> {
    return [
      {
        id: FulfillmentConstants.ID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.ID,
        shop_id: ShopConstants.ID,
        type: FulfillmentType.SHIPPING
      },
      {
        id: FulfillmentConstants.InStorePickupID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.InStorePickupID,
        shop_id: ShopConstants.ID,
        type: FulfillmentType.IN_STORE_PICKUP
      }
    ];
  }
}
