import type { DeliveryMethodTable } from '@/persistence/entities/delivery-method';
import { DeliveryMethodType } from '@/persistence/entities/delivery-method';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderConstants } from './order.fixtures';
import { ShopConstants } from './shop.fixtures';

export const DeliveryMethodConstants = {
  ProcessingOrderDeliveryMethodID: TestUtils.generateUUID(),
  PlacedOrderDeliveryMethodID: TestUtils.generateUUID(),
  PartiallyFulfilledOrderDeliveryMethodID: TestUtils.generateUUID(),
  ModifyingOrderDeliveryMethodID: TestUtils.generateUUID(),
  CompletedOrderDeliveryMethodID: TestUtils.generateUUID(),
  PickupDeliveryMethodID: TestUtils.generateUUID()
};

export class DeliveryMethodFixtures implements Fixture<DeliveryMethodTable> {
  table: Tables = Tables.DeliveryMethod;

  async build(): Promise<Partial<DeliveryMethodTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: DeliveryMethodConstants.ProcessingOrderDeliveryMethodID,
        order_id: OrderConstants.ProcessingOrderID,
        type: DeliveryMethodType.Shipping,
        amount: 500,
        total: 500
      },
      {
        shop_id: ShopConstants.ID,
        id: DeliveryMethodConstants.PlacedOrderDeliveryMethodID,
        order_id: OrderConstants.PlacedOrderID,
        type: DeliveryMethodType.Shipping,
        amount: 500,
        total: 500
      },
      {
        shop_id: ShopConstants.ID,
        id: DeliveryMethodConstants.PartiallyFulfilledOrderDeliveryMethodID,
        order_id: OrderConstants.PartiallyFulfilledOrderID,
        type: DeliveryMethodType.Pickup,
        amount: 0,
        total: 0
      },
      {
        shop_id: ShopConstants.ID,
        id: DeliveryMethodConstants.ModifyingOrderDeliveryMethodID,
        order_id: OrderConstants.ModifyingOrderID,
        type: DeliveryMethodType.Shipping,
        amount: 500,
        total: 500
      },
      {
        shop_id: ShopConstants.ID,
        id: DeliveryMethodConstants.CompletedOrderDeliveryMethodID,
        order_id: OrderConstants.CompletedOrderID,
        type: DeliveryMethodType.Shipping,
        amount: 500,
        total: 500
      }
    ];
  }
}
