import { OrderState } from '@/persistence/entities/order';
import type { OrderTable } from '@/persistence/entities/order';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomerConstants } from './customer.fixtures';
import { ShopConstants } from './shop.fixtures';

const Order1ID = TestUtils.generateUUID();
const Order2ID = TestUtils.generateUUID();

export const OrderConstants = {
  Order1ID,
  Order1Code: 'ORD-001',
  Order2ID,
  Order2Code: 'ORD-002'
};

export class OrderFixtures implements Fixture<OrderTable> {
  table: Tables = Tables.Order;

  async build(): Promise<Partial<OrderTable>[]> {
    return [
      {
        id: OrderConstants.Order1ID,
        shop_id: ShopConstants.ID,
        customer_id: CustomerConstants.ID,
        code: OrderConstants.Order1Code,
        state: OrderState.Placed,
        total: 10000,
        subtotal: 10000,
        total_quantity: 2,
        applied_discounts: JSON.stringify([]),
        placed_at: new Date()
      },
      {
        id: OrderConstants.Order2ID,
        shop_id: ShopConstants.ID,
        customer_id: CustomerConstants.ID,
        code: OrderConstants.Order2Code,
        state: OrderState.Completed,
        total: 5000,
        subtotal: 5000,
        total_quantity: 1,
        applied_discounts: JSON.stringify([]),
        placed_at: new Date(),
        completed_at: new Date()
      }
    ];
  }
}
