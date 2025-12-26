import type { DeliveryMethodTable } from '@/persistence/entities/delivery-method';
import { DeliveryMethodType } from '@/persistence/entities/delivery-method';
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

export class FulfillmentFixtures implements Fixture<DeliveryMethodTable> {
  table: Tables = Tables.DeliveryMethod;

  async build(): Promise<Partial<DeliveryMethodTable>[]> {
    return [
      {
        id: FulfillmentConstants.ShippingForPlacedID,
        shop_id: ShopConstants.ID,
        order_id: OrderConstants.PlacedWithShippingID,
        type: DeliveryMethodType.Shipping,
        amount: 500,
        total: 500
      },
      {
        id: FulfillmentConstants.ShippingForProcessingID,
        shop_id: ShopConstants.ID,
        order_id: OrderConstants.ProcessingWithShippingID,
        type: DeliveryMethodType.Shipping,
        amount: 500,
        total: 500
      },
      {
        id: FulfillmentConstants.PickupForPlacedID,
        shop_id: ShopConstants.ID,
        order_id: OrderConstants.PlacedWithPickupID,
        type: DeliveryMethodType.Pickup,
        amount: 0,
        total: 0
      }
    ];
  }
}
