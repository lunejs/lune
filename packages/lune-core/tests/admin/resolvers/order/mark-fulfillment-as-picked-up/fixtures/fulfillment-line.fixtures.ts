import type { FulfillmentLineTable } from '@/persistence/entities/fulfillment-line';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { FulfillmentConstants } from './fulfillment.fixtures';
import { OrderLineConstants } from './order-line.fixtures';
import { ShopConstants } from './shop.fixtures';

export const FulfillmentLineConstants = {
  ReadyForPickupFulfillmentLineID: TestUtils.generateUUID(),
  ShippingFulfillmentLineID: TestUtils.generateUUID(),
  PendingPickupFulfillmentLineID: TestUtils.generateUUID()
};

export class FulfillmentLineFixtures implements Fixture<FulfillmentLineTable> {
  table: Tables = Tables.FulfillmentLine;

  async build(): Promise<Partial<FulfillmentLineTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: FulfillmentLineConstants.ReadyForPickupFulfillmentLineID,
        fulfillment_id: FulfillmentConstants.ReadyForPickupFulfillmentID,
        order_line_id: OrderLineConstants.ReadyForPickupOrderLineID,
        quantity: 1
      },
      {
        shop_id: ShopConstants.ID,
        id: FulfillmentLineConstants.ShippingFulfillmentLineID,
        fulfillment_id: FulfillmentConstants.ShippingFulfillmentID,
        order_line_id: OrderLineConstants.ShippingOrderLineID,
        quantity: 1
      },
      {
        shop_id: ShopConstants.ID,
        id: FulfillmentLineConstants.PendingPickupFulfillmentLineID,
        fulfillment_id: FulfillmentConstants.PendingPickupFulfillmentID,
        order_line_id: OrderLineConstants.PendingPickupOrderLineID,
        quantity: 1
      }
    ];
  }
}
