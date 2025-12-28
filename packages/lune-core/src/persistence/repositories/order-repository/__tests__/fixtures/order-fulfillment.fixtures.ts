import type { FulfillmentTable } from '@/persistence/entities/fulfillment';
import { FulfillmentState, FulfillmentType } from '@/persistence/entities/fulfillment';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderConstants } from './order.fixtures';
import { ShopConstants } from './shop.fixtures';

export const OrderFulfillmentConstants = {
  ID: TestUtils.generateUUID(),
  Code: 'FF-001',

  InStorePickupID: TestUtils.generateUUID(),
  InStorePickupCode: 'FF-002'
};

export class OrderFulfillmentFixtures implements Fixture<FulfillmentTable> {
  table: Tables = Tables.Fulfillment;

  async build(): Promise<Partial<FulfillmentTable>[]> {
    return [
      {
        id: OrderFulfillmentConstants.ID,
        code: OrderFulfillmentConstants.Code,
        total_quantity: 2,
        state: FulfillmentState.Pending,
        type: FulfillmentType.Shipping,
        metadata: {
          trackingCode: null,
          carrier: null,
          shippedAt: null,
          deliveredAt: null
        },
        order_id: OrderConstants.ID,
        shop_id: ShopConstants.ID
      },
      {
        id: OrderFulfillmentConstants.InStorePickupID,
        code: OrderFulfillmentConstants.InStorePickupCode,
        total_quantity: 2,
        state: FulfillmentState.Pending,
        type: FulfillmentType.Pickup,
        metadata: {
          readyAt: null,
          pickedUpAt: null
        },
        order_id: OrderConstants.InStorePickupID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
