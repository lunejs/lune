import type { OrderTable } from '@/persistence/entities/order';
import { OrderState } from '@/persistence/entities/order';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

// Dec 15: orders with totals 10000, 20000 -> avg = 15000
// Dec 16: orders with totals 30000 -> avg = 30000
// Dec 17: orders with totals 40000, 50000, 60000 -> avg = 50000
// Grand total avg (of days with sales): (15000 + 30000 + 50000) / 3 = 31667

export const OrderConstants = {
  // Date range for tests
  StartsAt: '2024-12-15',
  EndsAt: '2024-12-17',

  // Expected averages per day (in cents)
  Dec15Avg: 15000, // (10000 + 20000) / 2
  Dec16Avg: 30000, // 30000 / 1
  Dec17Avg: 50000, // (40000 + 50000 + 60000) / 3

  // Grand total is average of daily averages (only days with sales)
  GrandTotalAvg: 31667 // Math.round((15000 + 30000 + 50000) / 3)
};

export class OrderFixtures implements Fixture<OrderTable> {
  table: Tables = Tables.Order;

  async build(): Promise<Partial<OrderTable>[]> {
    return [
      // Dec 15 - 2 orders: avg = 15000
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
        total: 20000,
        placed_at: new Date('2024-12-15T14:00:00Z')
      },

      // Dec 16 - 1 order: avg = 30000
      {
        shop_id: ShopConstants.ID,
        id: TestUtils.generateUUID(),
        code: '#1003',
        state: OrderState.Shipped,
        total: 30000,
        placed_at: new Date('2024-12-16T09:00:00Z')
      },

      // Dec 17 - 3 orders: avg = 50000
      {
        shop_id: ShopConstants.ID,
        id: TestUtils.generateUUID(),
        code: '#1004',
        state: OrderState.Processing,
        total: 40000,
        placed_at: new Date('2024-12-17T09:00:00Z')
      },
      {
        shop_id: ShopConstants.ID,
        id: TestUtils.generateUUID(),
        code: '#1005',
        state: OrderState.Placed,
        total: 50000,
        placed_at: new Date('2024-12-17T12:00:00Z')
      },
      {
        shop_id: ShopConstants.ID,
        id: TestUtils.generateUUID(),
        code: '#1006',
        state: OrderState.Delivered,
        total: 60000,
        placed_at: new Date('2024-12-17T15:00:00Z')
      },

      // Orders that should be excluded
      {
        shop_id: ShopConstants.ID,
        id: TestUtils.generateUUID(),
        code: null,
        state: OrderState.Modifying,
        total: 99999,
        placed_at: null
      },
      {
        shop_id: ShopConstants.ID,
        id: TestUtils.generateUUID(),
        code: '#9001',
        state: OrderState.Canceled,
        total: 88888,
        placed_at: new Date('2024-12-16T15:00:00Z')
      }
    ];
  }
}
