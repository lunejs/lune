import { LunePrice } from '@lunejs/common';

import { OrderState, type OrderTable } from '@/persistence/entities/order';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomerConstants } from './customer.fixtures';
import { ShopConstants } from './shop.fixtures';

export const OrderConstants = {
  ID: TestUtils.generateUUID(),
  WithoutDeliveryMethodID: TestUtils.generateUUID(),
  WithoutCustomerID: TestUtils.generateUUID(),
  PlacedID: TestUtils.generateUUID(),
  PlacedID2: TestUtils.generateUUID(),
  WithLowStockID: TestUtils.generateUUID(),
  WithDiscountCodeID: TestUtils.generateUUID(),
  WithOrderLineDiscountID: TestUtils.generateUUID(),
  WithDeliveryMethodDiscountID: TestUtils.generateUUID()
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
        id: OrderConstants.WithoutDeliveryMethodID,
        subtotal: LunePrice.toCent(2100),
        total: LunePrice.toCent(2300),
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
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.WithLowStockID,
        subtotal: LunePrice.toCent(500),
        total: LunePrice.toCent(700),
        total_quantity: 1,
        customer_id: CustomerConstants.ID
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.WithDiscountCodeID,
        subtotal: LunePrice.toCent(2100),
        total: LunePrice.toCent(2300),
        total_quantity: 2,
        customer_id: CustomerConstants.ID,
        applied_discounts: JSON.stringify([
          {
            code: 'ORDER_DISCOUNT',
            applicationMode: 'CODE',
            applicationLevel: 'ORDER',
            amount: 0
          }
        ])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.WithOrderLineDiscountID,
        subtotal: LunePrice.toCent(2100),
        total: LunePrice.toCent(2300),
        total_quantity: 2,
        customer_id: CustomerConstants.ID,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.WithDeliveryMethodDiscountID,
        subtotal: LunePrice.toCent(2100),
        total: LunePrice.toCent(2300),
        total_quantity: 2,
        customer_id: CustomerConstants.ID,
        applied_discounts: JSON.stringify([
          {
            code: 'DELIVERY_METHOD_DISCOUNT',
            applicationMode: 'CODE',
            applicationLevel: 'DELIVERY_METHOD',
            amount: 0
          }
        ])
      }
    ];
  }
}
