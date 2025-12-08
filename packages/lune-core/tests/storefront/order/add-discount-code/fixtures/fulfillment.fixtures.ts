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
  WithoutCustomerID: TestUtils.generateUUID(),
  WithOrderLevelDiscountID: TestUtils.generateUUID(),
  WithOrderLineLevelDiscountID: TestUtils.generateUUID(),
  WithFulfillmentLevelDiscountID: TestUtils.generateUUID()
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
        id: FulfillmentConstants.WithoutCustomerID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.WithoutCustomerID,
        shop_id: ShopConstants.ID,
        type: FulfillmentType.SHIPPING
      },
      {
        id: FulfillmentConstants.WithOrderLevelDiscountID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.WithOrderLevelDiscountID,
        shop_id: ShopConstants.ID,
        type: FulfillmentType.SHIPPING
      },
      {
        id: FulfillmentConstants.WithOrderLineLevelDiscountID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.WithOrderLineLevelDiscountID,
        shop_id: ShopConstants.ID,
        type: FulfillmentType.SHIPPING
      },
      {
        id: FulfillmentConstants.WithFulfillmentLevelDiscountID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(150), // 200 - 50 discount
        order_id: OrderConstants.WithFulfillmentLevelDiscountID,
        shop_id: ShopConstants.ID,
        type: FulfillmentType.SHIPPING
      }
    ];
  }
}
