import { LunePrice } from '@lunejs/common';

import type { OrderLineTable } from '@/persistence/entities/order-line';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderConstants } from './order.fixtures';
import { ShopConstants } from './shop.fixtures';
import { VariantConstants } from './variant.fixtures';

export const OrderLineConstants = {
  ID: TestUtils.generateUUID(),
  InPlacedOrderID: TestUtils.generateUUID()
};

export class OrderLineFixtures implements Fixture<OrderLineTable> {
  table: Tables = Tables.OrderLine;

  async build(): Promise<Partial<OrderLineTable>[]> {
    return [
      {
        id: OrderLineConstants.ID,
        order_id: OrderConstants.ID,
        variant_id: VariantConstants.AlreadyInLineID,
        line_total: LunePrice.toCent(VariantConstants.AlreadyInLinePrice * 2),
        line_subtotal: LunePrice.toCent(VariantConstants.AlreadyInLinePrice * 2),
        quantity: 2,
        unit_price: LunePrice.toCent(VariantConstants.AlreadyInLinePrice),
        shop_id: ShopConstants.ID
      },
      {
        id: OrderLineConstants.InPlacedOrderID,
        order_id: OrderConstants.OrderPlacedID,
        variant_id: VariantConstants.AlreadyInLineID,
        line_total: LunePrice.toCent(VariantConstants.AlreadyInLinePrice),
        line_subtotal: LunePrice.toCent(VariantConstants.AlreadyInLinePrice),
        quantity: 1,
        unit_price: LunePrice.toCent(VariantConstants.AlreadyInLinePrice),
        shop_id: ShopConstants.ID
      }
    ];
  }
}
