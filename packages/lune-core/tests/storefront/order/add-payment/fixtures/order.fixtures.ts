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
  WithLowStockID: TestHelper.generateUUID()
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
      }
    ];
  }
}
