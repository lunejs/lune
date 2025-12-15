import type { FulfillmentTable } from '@/persistence/entities/fulfillment';
import { FulfillmentType } from '@/persistence/entities/fulfillment';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderConstants } from './order.fixtures';
import { ShopConstants } from './shop.fixtures';

export const FulfillmentConstants = {
  PickupForPlacedID: TestUtils.generateUUID(),
  PickupForProcessingID: TestUtils.generateUUID(),
  ShippingForPlacedID: TestUtils.generateUUID()
};

export class FulfillmentFixtures implements Fixture<FulfillmentTable> {
  table: Tables = Tables.Fulfillment;

  async build(): Promise<Partial<FulfillmentTable>[]> {
    return [
      {
        id: FulfillmentConstants.PickupForPlacedID,
        shop_id: ShopConstants.ID,
        order_id: OrderConstants.PlacedWithPickupID,
        type: FulfillmentType.IN_STORE_PICKUP,
        amount: 0,
        total: 0
      },
      {
        id: FulfillmentConstants.PickupForProcessingID,
        shop_id: ShopConstants.ID,
        order_id: OrderConstants.ProcessingWithPickupID,
        type: FulfillmentType.IN_STORE_PICKUP,
        amount: 0,
        total: 0
      },
      {
        id: FulfillmentConstants.ShippingForPlacedID,
        shop_id: ShopConstants.ID,
        order_id: OrderConstants.PlacedWithShippingID,
        type: FulfillmentType.SHIPPING,
        amount: 500,
        total: 500
      }
    ];
  }
}
