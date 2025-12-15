import type { OrderTable } from '@/persistence/entities/order';
import { OrderState } from '@/persistence/entities/order';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const OrderConstants = {
  PlacedOrderID: TestUtils.generateUUID(),
  ModifyingOrderID: TestUtils.generateUUID(),
  ProcessingOrderID: TestUtils.generateUUID()
};

export class OrderFixtures implements Fixture<OrderTable> {
  table: Tables = Tables.Order;

  async build(): Promise<Partial<OrderTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.PlacedOrderID,
        state: OrderState.Placed,
        code: '#001',
        total: 1000,
        subtotal: 1000,
        total_quantity: 1,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.ModifyingOrderID,
        state: OrderState.Modifying,
        total: 500,
        subtotal: 500,
        total_quantity: 1,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.ProcessingOrderID,
        state: OrderState.Processing,
        code: '#002',
        total: 2000,
        subtotal: 2000,
        total_quantity: 2,
        applied_discounts: JSON.stringify([])
      }
    ];
  }
}
