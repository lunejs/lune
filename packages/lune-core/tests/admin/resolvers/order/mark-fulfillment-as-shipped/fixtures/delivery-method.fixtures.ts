import type { DeliveryMethodTable } from '@/persistence/entities/delivery-method';
import { DeliveryMethodType } from '@/persistence/entities/delivery-method';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderConstants } from './order.fixtures';
import { ShopConstants } from './shop.fixtures';

export const DeliveryMethodConstants = {
  ShippingOrderDeliveryMethodID: TestUtils.generateUUID(),
  PickupOrderDeliveryMethodID: TestUtils.generateUUID(),
  AlreadyShippedOrderDeliveryMethodID: TestUtils.generateUUID()
};

export class DeliveryMethodFixtures implements Fixture<DeliveryMethodTable> {
  table: Tables = Tables.DeliveryMethod;

  async build(): Promise<Partial<DeliveryMethodTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: DeliveryMethodConstants.ShippingOrderDeliveryMethodID,
        order_id: OrderConstants.ShippingOrderID,
        type: DeliveryMethodType.Shipping,
        amount: 500,
        total: 500
      },
      {
        shop_id: ShopConstants.ID,
        id: DeliveryMethodConstants.PickupOrderDeliveryMethodID,
        order_id: OrderConstants.PickupOrderID,
        type: DeliveryMethodType.Pickup,
        amount: 0,
        total: 0
      },
      {
        shop_id: ShopConstants.ID,
        id: DeliveryMethodConstants.AlreadyShippedOrderDeliveryMethodID,
        order_id: OrderConstants.AlreadyShippedOrderID,
        type: DeliveryMethodType.Shipping,
        amount: 500,
        total: 500
      }
    ];
  }
}
