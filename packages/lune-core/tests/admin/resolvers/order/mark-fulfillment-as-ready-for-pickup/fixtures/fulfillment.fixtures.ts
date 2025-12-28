import type { FulfillmentTable } from '@/persistence/entities/fulfillment';
import { FulfillmentState, FulfillmentType } from '@/persistence/entities/fulfillment';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderConstants } from './order.fixtures';
import { ShopConstants } from './shop.fixtures';

export const FulfillmentConstants = {
  PendingPickupFulfillmentID: TestUtils.generateUUID(),
  ShippingFulfillmentID: TestUtils.generateUUID(),
  AlreadyReadyFulfillmentID: TestUtils.generateUUID()
};

export class FulfillmentFixtures implements Fixture<FulfillmentTable> {
  table: Tables = Tables.Fulfillment;

  async build(): Promise<Partial<FulfillmentTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: FulfillmentConstants.PendingPickupFulfillmentID,
        order_id: OrderConstants.PendingPickupOrderID,
        code: '#F001',
        total_quantity: 1,
        state: FulfillmentState.Pending,
        type: FulfillmentType.Pickup,
        metadata: {
          readyAt: null,
          pickedUpAt: null
        }
      },
      {
        shop_id: ShopConstants.ID,
        id: FulfillmentConstants.ShippingFulfillmentID,
        order_id: OrderConstants.ShippingOrderID,
        code: '#F002',
        total_quantity: 1,
        state: FulfillmentState.Pending,
        type: FulfillmentType.Shipping,
        metadata: {
          carrier: null,
          trackingCode: null,
          shippedAt: null,
          deliveredAt: null
        }
      },
      {
        shop_id: ShopConstants.ID,
        id: FulfillmentConstants.AlreadyReadyFulfillmentID,
        order_id: OrderConstants.AlreadyReadyOrderID,
        code: '#F003',
        total_quantity: 2,
        state: FulfillmentState.ReadyForPickup,
        type: FulfillmentType.Pickup,
        metadata: {
          readyAt: new Date().toISOString(),
          pickedUpAt: null
        }
      }
    ];
  }
}
