import { LunePrice } from '@lune/common';

import type { OrderTable } from '@/persistence/entities/order';
import { OrderState } from '@/persistence/entities/order';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const OrderConstants = {
  PlacedID: TestUtils.generateUUID(),
  ProcessingID: TestUtils.generateUUID(),
  ShippedID: TestUtils.generateUUID(),
  DeliveredID: TestUtils.generateUUID(),
  CompletedID: TestUtils.generateUUID(),
  ModifyingID: TestUtils.generateUUID()
};

export class OrderFixtures implements Fixture<OrderTable> {
  table: Tables = Tables.Order;

  async build(): Promise<Partial<OrderTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.PlacedID,
        state: OrderState.Placed,
        code: '#001',
        total: LunePrice.toCent(1000),
        subtotal: LunePrice.toCent(1000),
        total_quantity: 1,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.ProcessingID,
        state: OrderState.Processing,
        code: '#002',
        total: LunePrice.toCent(2000),
        subtotal: LunePrice.toCent(2000),
        total_quantity: 2,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.ShippedID,
        state: OrderState.Fulfilled,
        code: '#003',
        total: LunePrice.toCent(1500),
        subtotal: LunePrice.toCent(1500),
        total_quantity: 1,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.DeliveredID,
        state: OrderState.Fulfilled,
        code: '#004',
        total: LunePrice.toCent(800),
        subtotal: LunePrice.toCent(800),
        total_quantity: 1,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.CompletedID,
        state: OrderState.Completed,
        code: '#005',
        total: LunePrice.toCent(1200),
        subtotal: LunePrice.toCent(1200),
        total_quantity: 1,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.ModifyingID,
        state: OrderState.Modifying,
        total: LunePrice.toCent(500),
        subtotal: LunePrice.toCent(500),
        total_quantity: 1,
        applied_discounts: JSON.stringify([])
      }
    ];
  }
}
