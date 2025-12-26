import type { DeliveryMethodTable } from '@/persistence/entities/delivery-method';
import { DeliveryMethodType } from '@/persistence/entities/delivery-method';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderConstants } from './order.fixtures';
import { ShopConstants } from './shop.fixtures';

export const FulfillmentConstants = {
  ShippingForShippedID: TestUtils.generateUUID(),
  PickupForReadyID: TestUtils.generateUUID()
};

export class FulfillmentFixtures implements Fixture<DeliveryMethodTable> {
  table: Tables = Tables.DeliveryMethod;

  async build(): Promise<Partial<DeliveryMethodTable>[]> {
    return [
      {
        id: FulfillmentConstants.ShippingForShippedID,
        shop_id: ShopConstants.ID,
        order_id: OrderConstants.ShippedWithShippingID,
        type: DeliveryMethodType.Shipping,
        amount: 500,
        total: 500
      },
      {
        id: FulfillmentConstants.PickupForReadyID,
        shop_id: ShopConstants.ID,
        order_id: OrderConstants.ReadyForPickupWithPickupID,
        type: DeliveryMethodType.Pickup,
        amount: 0,
        total: 0
      }
    ];
  }
}
