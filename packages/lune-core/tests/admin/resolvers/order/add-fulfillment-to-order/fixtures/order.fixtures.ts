import type { OrderTable } from '@/persistence/entities/order';
import { OrderState } from '@/persistence/entities/order';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const OrderConstants = {
  ProcessingOrderID: TestUtils.generateUUID(),
  PlacedOrderID: TestUtils.generateUUID(),
  PartiallyFulfilledOrderID: TestUtils.generateUUID(),
  ModifyingOrderID: TestUtils.generateUUID(),
  CompletedOrderID: TestUtils.generateUUID()
};

export class OrderFixtures implements Fixture<OrderTable> {
  table: Tables = Tables.Order;

  async build(): Promise<Partial<OrderTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.ProcessingOrderID,
        state: OrderState.Processing,
        code: '#001',
        total: 10000,
        subtotal: 10000,
        total_quantity: 2,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.PlacedOrderID,
        state: OrderState.Placed,
        code: '#002',
        total: 5000,
        subtotal: 5000,
        total_quantity: 1,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.PartiallyFulfilledOrderID,
        state: OrderState.PartiallyFulfilled,
        code: '#003',
        total: 15000,
        subtotal: 15000,
        total_quantity: 3,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.ModifyingOrderID,
        state: OrderState.Modifying,
        total: 2000,
        subtotal: 2000,
        total_quantity: 1,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.CompletedOrderID,
        state: OrderState.Completed,
        code: '#004',
        total: 3000,
        subtotal: 3000,
        total_quantity: 1,
        applied_discounts: JSON.stringify([])
      }
    ];
  }
}
