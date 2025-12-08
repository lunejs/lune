import { LunePrice } from '@lune/common';

import { OrderState, type OrderTable } from '@/persistence/entities/order';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { CustomerConstants } from './customer.fixtures';
import { ShopConstants } from './shop.fixtures';

export const OrderConstants = {
  ID: TestHelper.generateUUID(),
  WithoutFulfillmentID: TestHelper.generateUUID(),
  WithoutCustomerID: TestHelper.generateUUID(),
  PlacedID: TestHelper.generateUUID(),
  PlacedID2: TestHelper.generateUUID(),
  WithOrderLevelDiscountID: TestHelper.generateUUID(),
  WithOrderLineLevelDiscountID: TestHelper.generateUUID(),
  WithFulfillmentLevelDiscountID: TestHelper.generateUUID()
};

export class OrderFixtures implements Fixture<OrderTable> {
  table: Tables = Tables.Order;

  async build(): Promise<Partial<OrderTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.ID,
        subtotal: LunePrice.toCent(2100),
        total: LunePrice.toCent(2300),
        total_quantity: 2,
        customer_id: CustomerConstants.ID
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.WithoutFulfillmentID,
        subtotal: LunePrice.toCent(2100),
        total: LunePrice.toCent(2000),
        total_quantity: 2,
        customer_id: CustomerConstants.ID
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.WithoutCustomerID,
        subtotal: LunePrice.toCent(2100),
        total: LunePrice.toCent(2300),
        total_quantity: 2
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.PlacedID,
        state: OrderState.Placed,
        customer_id: CustomerConstants.ID
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.PlacedID2,
        state: OrderState.Placed,
        customer_id: CustomerConstants.ID
      },
      // Order with order-level automatic discount applied
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.WithOrderLevelDiscountID,
        subtotal: LunePrice.toCent(900), // 1000 - 100 discount
        total: LunePrice.toCent(1100), // 900 + 200 fulfillment
        total_quantity: 1,
        customer_id: CustomerConstants.ID,
        applied_discounts: JSON.stringify([
          {
            code: 'AUTOMATIC_ORDER_DISCOUNT',
            applicationMode: 'AUTOMATIC',
            applicationLevel: 'ORDER',
            amount: LunePrice.toCent(100)
          }
        ])
      },
      // Order with order-line-level automatic discount applied (2 lines, discount on one)
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.WithOrderLineLevelDiscountID,
        subtotal: LunePrice.toCent(1500), // 800 + 700 (1000 - 300 discount)
        total: LunePrice.toCent(1700), // 1500 + 200 fulfillment
        total_quantity: 2,
        customer_id: CustomerConstants.ID,
        applied_discounts: JSON.stringify([])
      },
      // Order with fulfillment-level automatic discount applied
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.WithFulfillmentLevelDiscountID,
        subtotal: LunePrice.toCent(1000),
        total: LunePrice.toCent(1150), // 1000 + 150 (200 - 50 discount)
        total_quantity: 1,
        customer_id: CustomerConstants.ID,
        applied_discounts: JSON.stringify([
          {
            code: 'AUTOMATIC_FULFILLMENT_DISCOUNT',
            applicationMode: 'AUTOMATIC',
            applicationLevel: 'FULFILLMENT',
            amount: LunePrice.toCent(50)
          }
        ])
      }
    ];
  }
}
