import type { FulfillmentTable } from '@/persistence/entities/fulfillment';
import { FulfillmentState, FulfillmentType } from '@/persistence/entities/fulfillment';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderConstants } from './order.fixtures';
import { ShopConstants } from './shop.fixtures';

export const FulfillmentConstants = {
  ReadyForPickupFulfillmentID: TestUtils.generateUUID(),
  ShippingFulfillmentID: TestUtils.generateUUID(),
  PendingPickupFulfillmentID: TestUtils.generateUUID()
};

export class FulfillmentFixtures implements Fixture<FulfillmentTable> {
  table: Tables = Tables.Fulfillment;

  async build(): Promise<Partial<FulfillmentTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: FulfillmentConstants.ReadyForPickupFulfillmentID,
        order_id: OrderConstants.ReadyForPickupOrderID,
        state: FulfillmentState.ReadyForPickup,
        type: FulfillmentType.Pickup,
        metadata: {
          readyAt: new Date().toISOString(),
          pickedUpAt: null
        }
      },
      {
        shop_id: ShopConstants.ID,
        id: FulfillmentConstants.ShippingFulfillmentID,
        order_id: OrderConstants.ShippingOrderID,
        state: FulfillmentState.Shipped,
        type: FulfillmentType.Shipping,
        metadata: {
          carrier: 'FedEx',
          trackingCode: 'TRACK123',
          shippedAt: new Date().toISOString(),
          deliveredAt: null
        }
      },
      {
        shop_id: ShopConstants.ID,
        id: FulfillmentConstants.PendingPickupFulfillmentID,
        order_id: OrderConstants.PendingPickupOrderID,
        state: FulfillmentState.Pending,
        type: FulfillmentType.Pickup,
        metadata: {
          readyAt: null,
          pickedUpAt: null
        }
      }
    ];
  }
}
