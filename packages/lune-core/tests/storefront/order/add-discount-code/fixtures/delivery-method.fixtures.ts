import { LunePrice } from '@lunejs/common';

import type { DeliveryMethodTable } from '@/persistence/entities/delivery-method';
import { DeliveryMethodType } from '@/persistence/entities/delivery-method';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderConstants } from './order.fixtures';
import { ShopConstants } from './shop.fixtures';

export const DeliveryMethodConstants = {
  ID: TestUtils.generateUUID(),
  WithoutCustomerID: TestUtils.generateUUID(),
  WithOrderLevelDiscountID: TestUtils.generateUUID(),
  WithOrderLineLevelDiscountID: TestUtils.generateUUID(),
  WithDeliveryMethodLevelDiscountID: TestUtils.generateUUID()
};

export class DeliveryMethodFixtures implements Fixture<DeliveryMethodTable> {
  table: Tables = Tables.DeliveryMethod;

  async build(): Promise<Partial<DeliveryMethodTable>[]> {
    return [
      {
        id: DeliveryMethodConstants.ID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.ID,
        shop_id: ShopConstants.ID,
        type: DeliveryMethodType.Shipping
      },
      {
        id: DeliveryMethodConstants.WithoutCustomerID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.WithoutCustomerID,
        shop_id: ShopConstants.ID,
        type: DeliveryMethodType.Shipping
      },
      {
        id: DeliveryMethodConstants.WithOrderLevelDiscountID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.WithOrderLevelDiscountID,
        shop_id: ShopConstants.ID,
        type: DeliveryMethodType.Shipping
      },
      {
        id: DeliveryMethodConstants.WithOrderLineLevelDiscountID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.WithOrderLineLevelDiscountID,
        shop_id: ShopConstants.ID,
        type: DeliveryMethodType.Shipping
      },
      {
        id: DeliveryMethodConstants.WithDeliveryMethodLevelDiscountID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(150), // 200 - 50 discount
        order_id: OrderConstants.WithDeliveryMethodLevelDiscountID,
        shop_id: ShopConstants.ID,
        type: DeliveryMethodType.Shipping
      }
    ];
  }
}
