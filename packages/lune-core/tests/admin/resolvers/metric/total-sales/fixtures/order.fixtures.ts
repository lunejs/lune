import type { OrderTable } from '@/persistence/entities/order';
import { OrderState } from '@/persistence/entities/order';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

// Orders placed on Dec 15, 2024
const Order1ID = TestUtils.generateUUID();
const Order2ID = TestUtils.generateUUID();

// Orders placed on Dec 16, 2024
const Order3ID = TestUtils.generateUUID();

// Orders placed on Dec 17, 2024
const Order4ID = TestUtils.generateUUID();

// Order in MODIFYING state (should be excluded)
const ModifyingOrderID = TestUtils.generateUUID();

// Order in CANCELED state (should be excluded)
const CanceledOrderID = TestUtils.generateUUID();

export const OrderConstants = {
  // Dec 15 orders
  Order1ID,
  Order1Total: 10000, // $100.00 in cents
  Order2ID,
  Order2Total: 15000, // $150.00 in cents

  // Dec 16 order
  Order3ID,
  Order3Total: 25000, // $250.00 in cents

  // Dec 17 order
  Order4ID,
  Order4Total: 30000, // $300.00 in cents

  // Excluded orders
  ModifyingOrderID,
  ModifyingOrderTotal: 5000,
  CanceledOrderID,
  CanceledOrderTotal: 8000,

  // Date range for tests
  StartsAt: '2024-12-15',
  EndsAt: '2024-12-17',

  // Expected totals
  Dec15Total: 25000, // Order1 + Order2
  Dec16Total: 25000, // Order3
  Dec17Total: 30000, // Order4
  GrandTotal: 80000 // All valid orders
};

export class OrderFixtures implements Fixture<OrderTable> {
  table: Tables = Tables.Order;

  async build(): Promise<Partial<OrderTable>[]> {
    return [
      // Dec 15 orders
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.Order1ID,
        code: '#1001',
        state: OrderState.Placed,
        total: OrderConstants.Order1Total,
        placed_at: new Date('2024-12-15T10:00:00Z')
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.Order2ID,
        code: '#1002',
        state: OrderState.Completed,
        total: OrderConstants.Order2Total,
        placed_at: new Date('2024-12-15T14:00:00Z')
      },

      // Dec 16 order
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.Order3ID,
        code: '#1003',
        state: OrderState.Fulfilled,
        total: OrderConstants.Order3Total,
        placed_at: new Date('2024-12-16T09:00:00Z')
      },

      // Dec 17 order
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.Order4ID,
        code: '#1004',
        state: OrderState.Processing,
        total: OrderConstants.Order4Total,
        placed_at: new Date('2024-12-17T11:00:00Z')
      },

      // Orders that should be excluded
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.ModifyingOrderID,
        code: null,
        state: OrderState.Modifying,
        total: OrderConstants.ModifyingOrderTotal,
        placed_at: null // MODIFYING orders don't have placed_at
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.CanceledOrderID,
        code: '#9001',
        state: OrderState.Canceled,
        total: OrderConstants.CanceledOrderTotal,
        placed_at: new Date('2024-12-16T15:00:00Z')
      }
    ];
  }
}
