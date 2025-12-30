import { LunePrice } from '@lunejs/common';

import { OrderState, type OrderTable } from '@/persistence/entities/order';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';
import { VariantConstants } from './variant.fixtures';

export const OrderConstants = {
  ID: TestUtils.generateUUID(),
  Code: '#123',

  OrderPlacedID: TestUtils.generateUUID()
};

export class OrderFixtures implements Fixture<OrderTable> {
  table: Tables = Tables.Order;

  async build(): Promise<Partial<OrderTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.ID,
        code: OrderConstants.Code,
        total: LunePrice.toCent(VariantConstants.AlreadyInLinePrice * 2),
        subtotal: LunePrice.toCent(VariantConstants.AlreadyInLinePrice * 2),
        total_quantity: 2
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.OrderPlacedID,
        state: OrderState.Placed
      }
    ];
  }
}
