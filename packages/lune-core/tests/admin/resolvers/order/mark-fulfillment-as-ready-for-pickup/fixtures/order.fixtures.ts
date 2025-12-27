import type { OrderTable } from '@/persistence/entities/order';
import { OrderState } from '@/persistence/entities/order';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const OrderConstants = {
  PendingPickupOrderID: TestUtils.generateUUID(),
  ShippingOrderID: TestUtils.generateUUID(),
  AlreadyReadyOrderID: TestUtils.generateUUID()
};

export class OrderFixtures implements Fixture<OrderTable> {
  table: Tables = Tables.Order;

  async build(): Promise<Partial<OrderTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.PendingPickupOrderID,
        state: OrderState.PartiallyFulfilled,
        code: '#001',
        total: 10000,
        subtotal: 10000,
        total_quantity: 2,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.ShippingOrderID,
        state: OrderState.PartiallyFulfilled,
        code: '#002',
        total: 5000,
        subtotal: 5000,
        total_quantity: 1,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.AlreadyReadyOrderID,
        state: OrderState.PartiallyFulfilled,
        code: '#003',
        total: 5000,
        subtotal: 5000,
        total_quantity: 1,
        applied_discounts: JSON.stringify([])
      }
    ];
  }
}
