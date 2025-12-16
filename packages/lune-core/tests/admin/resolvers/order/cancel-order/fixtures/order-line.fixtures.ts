import { LunePrice } from '@lune/common';

import type { OrderLineTable } from '@/persistence/entities/order-line';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderConstants } from './order.fixtures';
import { ShopConstants } from './shop.fixtures';
import { VariantConstants } from './variant.fixtures';

export const OrderLineConstants = {
  PlacedLineID: TestUtils.generateUUID(),
  ProcessingLineID: TestUtils.generateUUID(),
  ProcessingLineID2: TestUtils.generateUUID()
};

export class OrderLineFixtures implements Fixture<OrderLineTable> {
  table: Tables = Tables.OrderLine;

  async build(): Promise<Partial<OrderLineTable>[]> {
    return [
      {
        id: OrderLineConstants.PlacedLineID,
        shop_id: ShopConstants.ID,
        order_id: OrderConstants.PlacedID,
        variant_id: VariantConstants.ID,
        quantity: 1,
        unit_price: LunePrice.toCent(1000),
        line_subtotal: LunePrice.toCent(1000),
        line_total: LunePrice.toCent(1000),
        applied_discounts: JSON.stringify([])
      },
      {
        id: OrderLineConstants.ProcessingLineID,
        shop_id: ShopConstants.ID,
        order_id: OrderConstants.ProcessingID,
        variant_id: VariantConstants.ID,
        quantity: 2,
        unit_price: LunePrice.toCent(1000),
        line_subtotal: LunePrice.toCent(2000),
        line_total: LunePrice.toCent(2000),
        applied_discounts: JSON.stringify([])
      }
    ];
  }
}
