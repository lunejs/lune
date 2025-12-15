import type { FulfillmentTable } from '@/persistence/entities/fulfillment';
import { FulfillmentType } from '@/persistence/entities/fulfillment';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderConstants } from './order.fixtures';
import { ShopConstants } from './shop.fixtures';

export const FulfillmentConstants = {
  ShippingForPlacedID: TestUtils.generateUUID(),
  ShippingForProcessingID: TestUtils.generateUUID(),
  PickupForPlacedID: TestUtils.generateUUID()
};

export class FulfillmentFixtures implements Fixture<FulfillmentTable> {
  table: Tables = Tables.Fulfillment;

  async build(): Promise<Partial<FulfillmentTable>[]> {
    return [
      {
        id: FulfillmentConstants.ShippingForPlacedID,
        shop_id: ShopConstants.ID,
        order_id: OrderConstants.PlacedWithShippingID,
        type: FulfillmentType.SHIPPING,
        amount: 500,
        total: 500
      },
      {
        id: FulfillmentConstants.ShippingForProcessingID,
        shop_id: ShopConstants.ID,
        order_id: OrderConstants.ProcessingWithShippingID,
        type: FulfillmentType.SHIPPING,
        amount: 500,
        total: 500
      },
      {
        id: FulfillmentConstants.PickupForPlacedID,
        shop_id: ShopConstants.ID,
        order_id: OrderConstants.PlacedWithPickupID,
        type: FulfillmentType.IN_STORE_PICKUP,
        amount: 0,
        total: 0
      }
    ];
  }
}
