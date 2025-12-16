import type { OrderTable } from '@/persistence/entities/order';
import { OrderState } from '@/persistence/entities/order';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const OrderConstants = {
  DeliveredID: TestUtils.generateUUID(),
  PlacedID: TestUtils.generateUUID(),
  ProcessingID: TestUtils.generateUUID(),
  ShippedID: TestUtils.generateUUID(),
  ModifyingID: TestUtils.generateUUID()
};

export class OrderFixtures implements Fixture<OrderTable> {
  table: Tables = Tables.Order;

  async build(): Promise<Partial<OrderTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.DeliveredID,
        state: OrderState.Delivered,
        code: '#001',
        total: 1000,
        subtotal: 1000,
        total_quantity: 1,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.PlacedID,
        state: OrderState.Placed,
        code: '#002',
        total: 1500,
        subtotal: 1500,
        total_quantity: 1,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.ProcessingID,
        state: OrderState.Processing,
        code: '#003',
        total: 800,
        subtotal: 800,
        total_quantity: 1,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.ShippedID,
        state: OrderState.Shipped,
        code: '#004',
        total: 2000,
        subtotal: 2000,
        total_quantity: 2,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.ModifyingID,
        state: OrderState.Modifying,
        code: '#005',
        total: 500,
        subtotal: 500,
        total_quantity: 1,
        applied_discounts: JSON.stringify([])
      }
    ];
  }
}
