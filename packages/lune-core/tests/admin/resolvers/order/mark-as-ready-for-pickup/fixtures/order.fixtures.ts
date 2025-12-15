import type { OrderTable } from '@/persistence/entities/order';
import { OrderState } from '@/persistence/entities/order';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const OrderConstants = {
  PlacedWithPickupID: TestUtils.generateUUID(),
  ProcessingWithPickupID: TestUtils.generateUUID(),
  PlacedWithShippingID: TestUtils.generateUUID(),
  ModifyingID: TestUtils.generateUUID(),
  PlacedWithoutFulfillmentID: TestUtils.generateUUID()
};

export class OrderFixtures implements Fixture<OrderTable> {
  table: Tables = Tables.Order;

  async build(): Promise<Partial<OrderTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.PlacedWithPickupID,
        state: OrderState.Placed,
        code: '#001',
        total: 1000,
        subtotal: 1000,
        total_quantity: 1,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.ProcessingWithPickupID,
        state: OrderState.Processing,
        code: '#002',
        total: 2000,
        subtotal: 2000,
        total_quantity: 2,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.PlacedWithShippingID,
        state: OrderState.Placed,
        code: '#003',
        total: 1500,
        subtotal: 1500,
        total_quantity: 1,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.ModifyingID,
        state: OrderState.Modifying,
        total: 500,
        subtotal: 500,
        total_quantity: 1,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.PlacedWithoutFulfillmentID,
        state: OrderState.Placed,
        code: '#004',
        total: 800,
        subtotal: 800,
        total_quantity: 1,
        applied_discounts: JSON.stringify([])
      }
    ];
  }
}
