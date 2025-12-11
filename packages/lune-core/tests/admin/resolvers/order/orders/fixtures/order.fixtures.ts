import type { OrderTable } from '@/persistence/entities/order';
import { OrderState } from '@/persistence/entities/order';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomerConstants } from './customer.fixtures';
import { ShopConstants } from './shop.fixtures';

export const OrderConstants = {
  // Placed orders
  PlacedOrderID: TestUtils.generateUUID(),
  PlacedOrderCode: '#1001',

  PlacedOrder2ID: TestUtils.generateUUID(),
  PlacedOrder2Code: '#1002',

  // Processing order
  ProcessingOrderID: TestUtils.generateUUID(),
  ProcessingOrderCode: '#2001',

  // Shipped order
  ShippedOrderID: TestUtils.generateUUID(),
  ShippedOrderCode: '#3001',

  // Completed order
  CompletedOrderID: TestUtils.generateUUID(),
  CompletedOrderCode: '#4001',

  // Modifying order (should be excluded by default)
  ModifyingOrderID: TestUtils.generateUUID(),

  // Canceled order (should be excluded by default)
  CanceledOrderID: TestUtils.generateUUID(),
  CanceledOrderCode: '#9001'
};

export class OrderFixtures implements Fixture<OrderTable> {
  table: Tables = Tables.Order;

  async build(): Promise<Partial<OrderTable>[]> {
    return [
      // John's orders
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.PlacedOrderID,
        code: OrderConstants.PlacedOrderCode,
        state: OrderState.Placed,
        customer_id: CustomerConstants.JohnID
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.ProcessingOrderID,
        code: OrderConstants.ProcessingOrderCode,
        state: OrderState.Processing,
        customer_id: CustomerConstants.JohnID
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.CompletedOrderID,
        code: OrderConstants.CompletedOrderCode,
        state: OrderState.Completed,
        customer_id: CustomerConstants.JohnID
      },

      // Jane's orders
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.PlacedOrder2ID,
        code: OrderConstants.PlacedOrder2Code,
        state: OrderState.Placed,
        customer_id: CustomerConstants.JaneID
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.ShippedOrderID,
        code: OrderConstants.ShippedOrderCode,
        state: OrderState.Shipped,
        customer_id: CustomerConstants.JaneID
      },

      // Orders that should be excluded by default
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.ModifyingOrderID,
        code: null,
        state: OrderState.Modifying,
        customer_id: CustomerConstants.JohnID
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.CanceledOrderID,
        code: OrderConstants.CanceledOrderCode,
        state: OrderState.Canceled,
        customer_id: CustomerConstants.JaneID
      }
    ];
  }
}
