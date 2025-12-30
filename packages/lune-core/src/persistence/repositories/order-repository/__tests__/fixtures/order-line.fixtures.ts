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
  ID2: TestUtils.generateUUID(),

  InStorePickupID: TestUtils.generateUUID(),
  InStorePickupID2: TestUtils.generateUUID()
};

export class OrderLineFixtures implements Fixture<OrderLineTable> {
  table: Tables = Tables.OrderLine;

  async build(): Promise<Partial<OrderLineTable>[]> {
    return [
      // with fulfillment
      {
        id: OrderLineConstants.ID,
        order_id: OrderConstants.ID,
        variant_id: VariantConstants.AlreadyInLineID,
        line_total: LunePrice.toCent(800),
        line_subtotal: LunePrice.toCent(800),
        quantity: 1,
        unit_price: LunePrice.toCent(800),
        shop_id: ShopConstants.ID
      },
      {
        id: OrderLineConstants.ID2,
        order_id: OrderConstants.ID,
        variant_id: VariantConstants.ID,
        line_total: LunePrice.toCent(1_300),
        line_subtotal: LunePrice.toCent(1_300),
        quantity: 1,
        unit_price: LunePrice.toCent(1_300),
        shop_id: ShopConstants.ID
      },

      // In Store pickup
      {
        id: OrderLineConstants.InStorePickupID,
        order_id: OrderConstants.InStorePickupID,
        variant_id: VariantConstants.AlreadyInLineID,
        line_total: LunePrice.toCent(800),
        line_subtotal: LunePrice.toCent(800),
        quantity: 1,
        unit_price: LunePrice.toCent(800),
        shop_id: ShopConstants.ID
      },
      {
        id: OrderLineConstants.InStorePickupID2,
        order_id: OrderConstants.InStorePickupID,
        variant_id: VariantConstants.ID,
        line_total: LunePrice.toCent(1_300),
        line_subtotal: LunePrice.toCent(1_300),
        quantity: 1,
        unit_price: LunePrice.toCent(1_300),
        shop_id: ShopConstants.ID
      }
    ];
  }
}
