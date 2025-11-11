import { LunePrice } from '@lune/common';

import { OrderState, type OrderTable } from '@/persistence/entities/order';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { ShopConstants } from './shop.fixtures';
import { VariantConstants } from './variant.fixtures';

export const OrderConstants = {
  ID: TestHelper.generateUUID(),
  Code: '#123',

  OrderPlacedID: TestHelper.generateUUID()
};

export class OrderFixtures implements Fixture<OrderTable> {
  table: Tables = Tables.Order;

  async build(): Promise<Partial<OrderTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.ID,
        code: OrderConstants.Code,
        total: LunePrice.toCent(VariantConstants.AlreadyInLinePrice + VariantConstants.Price * 2),
        subtotal: LunePrice.toCent(
          VariantConstants.AlreadyInLinePrice + VariantConstants.Price * 2
        ),
        total_quantity: 3
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.OrderPlacedID,
        state: OrderState.Placed
      }
    ];
  }
}
