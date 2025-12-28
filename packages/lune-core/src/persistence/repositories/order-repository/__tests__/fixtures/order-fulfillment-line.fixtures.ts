import type { FulfillmentLineTable } from '@/persistence/entities/fulfillment-line';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderFulfillmentConstants } from './order-fulfillment.fixtures';
import { OrderLineConstants } from './order-line.fixtures';
import { ShopConstants } from './shop.fixtures';

export const OrderFulfillmentLineConstants = {
  ID: TestUtils.generateUUID(),
  ID2: TestUtils.generateUUID(),

  InStorePickupID: TestUtils.generateUUID(),
  InStorePickupID2: TestUtils.generateUUID()
};

export class OrderFulfillmentLineFixtures implements Fixture<FulfillmentLineTable> {
  table: Tables = Tables.FulfillmentLine;

  async build(): Promise<Partial<FulfillmentLineTable>[]> {
    return [
      {
        id: OrderFulfillmentLineConstants.ID,
        quantity: 1,
        fulfillment_id: OrderFulfillmentConstants.ID,
        order_line_id: OrderLineConstants.ID,
        shop_id: ShopConstants.ID
      },
      {
        id: OrderFulfillmentLineConstants.ID2,
        quantity: 1,
        fulfillment_id: OrderFulfillmentConstants.ID,
        order_line_id: OrderLineConstants.ID2,
        shop_id: ShopConstants.ID
      },
      {
        id: OrderFulfillmentLineConstants.InStorePickupID,
        quantity: 1,
        fulfillment_id: OrderFulfillmentConstants.InStorePickupID,
        order_line_id: OrderLineConstants.InStorePickupID,
        shop_id: ShopConstants.ID
      },
      {
        id: OrderFulfillmentLineConstants.InStorePickupID2,
        quantity: 1,
        fulfillment_id: OrderFulfillmentConstants.InStorePickupID,
        order_line_id: OrderLineConstants.InStorePickupID2,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
