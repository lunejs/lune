import { LunePrice } from '@lune/common';

import type { FulfillmentTable } from '@/persistence/entities/fulfillment';
import { FulfillmentType } from '@/persistence/entities/fulfillment';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderConstants } from './order.fixtures';
import { ShopConstants } from './shop.fixtures';

export const FulfillmentConstants = {
  ID: TestUtils.generateUUID(),
  WithCodeDiscountID: TestUtils.generateUUID(),
  WithNonExistentDiscountID: TestUtils.generateUUID(),
  WithDisabledDiscountID: TestUtils.generateUUID(),
  WithPrematureDiscountID: TestUtils.generateUUID(),
  WithExpiredDiscountID: TestUtils.generateUUID(),
  WithLimitExceededDiscountID: TestUtils.generateUUID(),
  ForOrderLineLevelID: TestUtils.generateUUID(),
  ForFulfillmentLevelID: TestUtils.generateUUID(),
  WithoutCustomerID: TestUtils.generateUUID()
};

export class FulfillmentFixtures implements Fixture<FulfillmentTable> {
  table: Tables = Tables.Fulfillment;

  async build(): Promise<Partial<FulfillmentTable>[]> {
    return [
      {
        id: FulfillmentConstants.ID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.ID,
        shop_id: ShopConstants.ID,
        type: FulfillmentType.SHIPPING
      },
      {
        id: FulfillmentConstants.WithCodeDiscountID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.WithCodeDiscountID,
        shop_id: ShopConstants.ID,
        type: FulfillmentType.SHIPPING
      },
      {
        id: FulfillmentConstants.WithNonExistentDiscountID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.WithNonExistentDiscountID,
        shop_id: ShopConstants.ID,
        type: FulfillmentType.SHIPPING
      },
      {
        id: FulfillmentConstants.WithDisabledDiscountID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.WithDisabledDiscountID,
        shop_id: ShopConstants.ID,
        type: FulfillmentType.SHIPPING
      },
      {
        id: FulfillmentConstants.WithPrematureDiscountID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.WithPrematureDiscountID,
        shop_id: ShopConstants.ID,
        type: FulfillmentType.SHIPPING
      },
      {
        id: FulfillmentConstants.WithExpiredDiscountID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.WithExpiredDiscountID,
        shop_id: ShopConstants.ID,
        type: FulfillmentType.SHIPPING
      },
      {
        id: FulfillmentConstants.WithLimitExceededDiscountID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.WithLimitExceededDiscountID,
        shop_id: ShopConstants.ID,
        type: FulfillmentType.SHIPPING
      },
      {
        id: FulfillmentConstants.ForOrderLineLevelID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.ForOrderLineLevelID,
        shop_id: ShopConstants.ID,
        type: FulfillmentType.SHIPPING
      },
      {
        id: FulfillmentConstants.ForFulfillmentLevelID,
        amount: LunePrice.toCent(600), // High fulfillment cost
        total: LunePrice.toCent(600),
        order_id: OrderConstants.ForFulfillmentLevelID,
        shop_id: ShopConstants.ID,
        type: FulfillmentType.SHIPPING
      },
      {
        id: FulfillmentConstants.WithoutCustomerID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.WithoutCustomerID,
        shop_id: ShopConstants.ID,
        type: FulfillmentType.SHIPPING
      }
    ];
  }
}
