import type { FulfillmentLineTable } from '@/persistence/entities/fulfillment-line';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { FulfillmentConstants } from './fulfillment.fixtures';
import { OrderLineConstants } from './order-line.fixtures';
import { ShopConstants } from './shop.fixtures';

export const FulfillmentLineConstants = {
  ShippedFulfillmentLineID: TestUtils.generateUUID(),
  PickupFulfillmentLineID: TestUtils.generateUUID(),
  PendingFulfillmentLineID: TestUtils.generateUUID()
};

export class FulfillmentLineFixtures implements Fixture<FulfillmentLineTable> {
  table: Tables = Tables.FulfillmentLine;

  async build(): Promise<Partial<FulfillmentLineTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: FulfillmentLineConstants.ShippedFulfillmentLineID,
        fulfillment_id: FulfillmentConstants.ShippedFulfillmentID,
        order_line_id: OrderLineConstants.ShippedFulfillmentOrderLineID,
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
        id: FulfillmentLineConstants.PendingFulfillmentLineID,
        fulfillment_id: FulfillmentConstants.PendingFulfillmentID,
        order_line_id: OrderLineConstants.PendingFulfillmentOrderLineID,
        quantity: 1
      }
    ];
  }
}
