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
  WithCodeDiscountID: TestUtils.generateUUID(),
  WithNonExistentDiscountID: TestUtils.generateUUID(),
  WithDisabledDiscountID: TestUtils.generateUUID(),
  WithPrematureDiscountID: TestUtils.generateUUID(),
  WithExpiredDiscountID: TestUtils.generateUUID(),
  WithLimitExceededDiscountID: TestUtils.generateUUID(),
  ForOrderLineLevelID: TestUtils.generateUUID(),
  ForDeliveryMethodLevelID: TestUtils.generateUUID(),
  WithoutCustomerID: TestUtils.generateUUID()
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
        id: DeliveryMethodConstants.WithCodeDiscountID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.WithCodeDiscountID,
        shop_id: ShopConstants.ID,
        type: DeliveryMethodType.Shipping
      },
      {
        id: DeliveryMethodConstants.WithNonExistentDiscountID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.WithNonExistentDiscountID,
        shop_id: ShopConstants.ID,
        type: DeliveryMethodType.Shipping
      },
      {
        id: DeliveryMethodConstants.WithDisabledDiscountID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.WithDisabledDiscountID,
        shop_id: ShopConstants.ID,
        type: DeliveryMethodType.Shipping
      },
      {
        id: DeliveryMethodConstants.WithPrematureDiscountID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.WithPrematureDiscountID,
        shop_id: ShopConstants.ID,
        type: DeliveryMethodType.Shipping
      },
      {
        id: DeliveryMethodConstants.WithExpiredDiscountID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.WithExpiredDiscountID,
        shop_id: ShopConstants.ID,
        type: DeliveryMethodType.Shipping
      },
      {
        id: DeliveryMethodConstants.WithLimitExceededDiscountID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.WithLimitExceededDiscountID,
        shop_id: ShopConstants.ID,
        type: DeliveryMethodType.Shipping
      },
      {
        id: DeliveryMethodConstants.ForOrderLineLevelID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.ForOrderLineLevelID,
        shop_id: ShopConstants.ID,
        type: DeliveryMethodType.Shipping
      },
      {
        id: DeliveryMethodConstants.ForDeliveryMethodLevelID,
        amount: LunePrice.toCent(600), // High delivery method cost
        total: LunePrice.toCent(600),
        order_id: OrderConstants.ForDeliveryMethodLevelID,
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
      }
    ];
  }
}
