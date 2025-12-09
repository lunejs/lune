import { LunePrice } from '@lune/common';

import type { OrderTable } from '@/persistence/entities/order';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomerConstants } from './customer.fixtures';
import { ShopConstants } from './shop.fixtures';

export const OrderConstants = {
  ID: TestUtils.generateUUID(),
  WithCodeDiscountID: TestUtils.generateUUID(),
  WithNonExistentDiscountID: TestUtils.generateUUID(),
  WithDisabledDiscountID: TestUtils.generateUUID(),
  WithPrematureDiscountID: TestUtils.generateUUID(),
  WithExpiredDiscountID: TestUtils.generateUUID(),
  WithLimitExceededDiscountID: TestUtils.generateUUID(),
  // Orders where customer already used the limit-exceeded discount
  PreviousUsage1ID: TestUtils.generateUUID(),
  PreviousUsage2ID: TestUtils.generateUUID(),
  // Order for OrderLine level discount test
  ForOrderLineLevelID: TestUtils.generateUUID(),
  // Order for Fulfillment level discount test
  ForFulfillmentLevelID: TestUtils.generateUUID(),
  // Order without fulfillment for Fulfillment level discount test
  WithoutFulfillmentID: TestUtils.generateUUID(),
  // Order without customer for perCustomerLimit test
  WithoutCustomerID: TestUtils.generateUUID()
};

export class OrderFixtures implements Fixture<OrderTable> {
  table: Tables = Tables.Order;

  async build(): Promise<Partial<OrderTable>[]> {
    return [
      // Base order for happy path test
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.ID,
        subtotal: LunePrice.toCent(2100),
        total: LunePrice.toCent(2300),
        total_quantity: 2,
        customer_id: CustomerConstants.ID
      },
      // Order with CODE discount already applied (for testing CODE > AUTOMATIC priority)
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.WithCodeDiscountID,
        subtotal: LunePrice.toCent(2000), // 2100 - 100 discount
        total: LunePrice.toCent(2200), // 2000 + 200 fulfillment
        total_quantity: 2,
        customer_id: CustomerConstants.ID,
        applied_discounts: JSON.stringify([
          {
            code: 'ORDER_DISCOUNT',
            applicationMode: 'CODE',
            applicationLevel: 'ORDER',
            amount: LunePrice.toCent(100)
          }
        ])
      },
      // Order with non-existent discount code applied
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.WithNonExistentDiscountID,
        subtotal: LunePrice.toCent(1900), // 2100 - 200 (fake discount)
        total: LunePrice.toCent(2100), // 1900 + 200 fulfillment
        total_quantity: 2,
        customer_id: CustomerConstants.ID,
        applied_discounts: JSON.stringify([
          {
            code: 'NON_EXISTENT_DISCOUNT',
            applicationMode: 'CODE',
            applicationLevel: 'ORDER',
            amount: LunePrice.toCent(200)
          }
        ])
      },
      // Order with disabled discount code applied
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.WithDisabledDiscountID,
        subtotal: LunePrice.toCent(1950), // 2100 - 150 (disabled discount)
        total: LunePrice.toCent(2150), // 1950 + 200 fulfillment
        total_quantity: 2,
        customer_id: CustomerConstants.ID,
        applied_discounts: JSON.stringify([
          {
            code: 'DISABLED_DISCOUNT',
            applicationMode: 'CODE',
            applicationLevel: 'ORDER',
            amount: LunePrice.toCent(150)
          }
        ])
      },
      // Order with premature discount code applied
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.WithPrematureDiscountID,
        subtotal: LunePrice.toCent(1925), // 2100 - 175 (premature discount)
        total: LunePrice.toCent(2125), // 1925 + 200 fulfillment
        total_quantity: 2,
        customer_id: CustomerConstants.ID,
        applied_discounts: JSON.stringify([
          {
            code: 'PREMATURE_DISCOUNT',
            applicationMode: 'CODE',
            applicationLevel: 'ORDER',
            amount: LunePrice.toCent(175)
          }
        ])
      },
      // Order with expired discount code applied
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.WithExpiredDiscountID,
        subtotal: LunePrice.toCent(1920), // 2100 - 180 (expired discount)
        total: LunePrice.toCent(2120), // 1920 + 200 fulfillment
        total_quantity: 2,
        customer_id: CustomerConstants.ID,
        applied_discounts: JSON.stringify([
          {
            code: 'EXPIRED_DISCOUNT',
            applicationMode: 'CODE',
            applicationLevel: 'ORDER',
            amount: LunePrice.toCent(180)
          }
        ])
      },
      // Order with discount that exceeds per_customer_limit
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.WithLimitExceededDiscountID,
        subtotal: LunePrice.toCent(1910), // 2100 - 190 (limit exceeded discount)
        total: LunePrice.toCent(2110), // 1910 + 200 fulfillment
        total_quantity: 2,
        customer_id: CustomerConstants.ID,
        applied_discounts: JSON.stringify([
          {
            code: 'LIMIT_EXCEEDED_DISCOUNT',
            applicationMode: 'CODE',
            applicationLevel: 'ORDER',
            amount: LunePrice.toCent(190)
          }
        ])
      },
      // Previous orders where customer used the limit-exceeded discount
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.PreviousUsage1ID,
        subtotal: LunePrice.toCent(1000),
        total: LunePrice.toCent(1000),
        total_quantity: 1,
        customer_id: CustomerConstants.ID
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.PreviousUsage2ID,
        subtotal: LunePrice.toCent(1000),
        total: LunePrice.toCent(1000),
        total_quantity: 1,
        customer_id: CustomerConstants.ID
      },
      // Order for OrderLine level discount test
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.ForOrderLineLevelID,
        subtotal: LunePrice.toCent(2100), // 800 + 1300
        total: LunePrice.toCent(2300), // 2100 + 200 fulfillment
        total_quantity: 2,
        customer_id: CustomerConstants.ID,
        applied_discounts: JSON.stringify([])
      },
      // Order for Fulfillment level discount test (fulfillment = $600)
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.ForFulfillmentLevelID,
        subtotal: LunePrice.toCent(2100), // 800 + 1300
        total: LunePrice.toCent(2700), // 2100 + 600 fulfillment
        total_quantity: 2,
        customer_id: CustomerConstants.ID,
        applied_discounts: JSON.stringify([])
      },
      // Order without fulfillment for Fulfillment level discount test
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.WithoutFulfillmentID,
        subtotal: LunePrice.toCent(2100), // 800 + 1300
        total: LunePrice.toCent(2100), // No fulfillment
        total_quantity: 2,
        customer_id: CustomerConstants.ID,
        applied_discounts: JSON.stringify([])
      },
      // Order without customer for perCustomerLimit test
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.WithoutCustomerID,
        subtotal: LunePrice.toCent(2100),
        total: LunePrice.toCent(2300),
        total_quantity: 2,
        customer_id: null,
        applied_discounts: JSON.stringify([])
      }
    ];
  }
}
