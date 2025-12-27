import type { FulfillmentLineTable } from '@/persistence/entities/fulfillment-line';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { FulfillmentConstants } from './fulfillment.fixtures';
import { OrderLineConstants } from './order-line.fixtures';
import { ShopConstants } from './shop.fixtures';

export const FulfillmentLineConstants = {
  PendingShippingFulfillmentLineID: TestUtils.generateUUID(),
  PickupFulfillmentLineID: TestUtils.generateUUID(),
  AlreadyShippedFulfillmentLineID: TestUtils.generateUUID()
};

export class FulfillmentLineFixtures implements Fixture<FulfillmentLineTable> {
  table: Tables = Tables.FulfillmentLine;

  async build(): Promise<Partial<FulfillmentLineTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: FulfillmentLineConstants.PendingShippingFulfillmentLineID,
        fulfillment_id: FulfillmentConstants.PendingShippingFulfillmentID,
        order_line_id: OrderLineConstants.ShippingOrderLineID,
        quantity: 1
      },
      {
        shop_id: ShopConstants.ID,
        id: FulfillmentLineConstants.PickupFulfillmentLineID,
        fulfillment_id: FulfillmentConstants.PickupFulfillmentID,
        order_line_id: OrderLineConstants.PickupOrderLineID,
        quantity: 1
      },
      {
        shop_id: ShopConstants.ID,
        id: FulfillmentLineConstants.AlreadyShippedFulfillmentLineID,
        fulfillment_id: FulfillmentConstants.AlreadyShippedFulfillmentID,
        order_line_id: OrderLineConstants.AlreadyShippedOrderLineID,
        quantity: 1
      }
    ];
  }
}
