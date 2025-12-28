import type { OrderTable } from '@/persistence/entities/order';
import { OrderState } from '@/persistence/entities/order';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const OrderConstants = {
  // Date range for tests
  StartsAt: '2024-12-15',
  EndsAt: '2024-12-17',

  // Expected counts per day
  Dec15Count: 2,
  Dec16Count: 1,
  Dec17Count: 1,
  GrandTotal: 4
};

export class OrderFixtures implements Fixture<OrderTable> {
  table: Tables = Tables.Order;

  async build(): Promise<Partial<OrderTable>[]> {
    return [
      // Dec 15 - 2 orders
      {
        shop_id: ShopConstants.ID,
        id: TestUtils.generateUUID(),
        code: '#1001',
        state: OrderState.Placed,
        total: 10000,
        placed_at: new Date('2024-12-15T10:00:00Z')
      },
      {
        shop_id: ShopConstants.ID,
        id: TestUtils.generateUUID(),
        code: '#1002',
        state: OrderState.Completed,
        total: 15000,
        placed_at: new Date('2024-12-15T14:00:00Z')
      },

      // Dec 16 - 1 order
      {
        shop_id: ShopConstants.ID,
        id: TestUtils.generateUUID(),
        code: '#1003',
        state: OrderState.Fulfilled,
        total: 25000,
        placed_at: new Date('2024-12-16T09:00:00Z')
      },

      // Dec 17 - 1 order
      {
        shop_id: ShopConstants.ID,
        id: TestUtils.generateUUID(),
        code: '#1004',
        state: OrderState.Processing,
        total: 30000,
        placed_at: new Date('2024-12-17T11:00:00Z')
      },

      // Orders that should be excluded
      {
        shop_id: ShopConstants.ID,
        id: TestUtils.generateUUID(),
        code: null,
        state: OrderState.Modifying,
        total: 5000,
        placed_at: null
      },
      {
        shop_id: ShopConstants.ID,
        id: TestUtils.generateUUID(),
        code: '#9001',
        state: OrderState.Canceled,
        total: 8000,
        placed_at: new Date('2024-12-16T15:00:00Z')
      }
    ];
  }
}
