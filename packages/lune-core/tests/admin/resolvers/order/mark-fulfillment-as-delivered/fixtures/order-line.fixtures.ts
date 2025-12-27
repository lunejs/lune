import type { OrderLineTable } from '@/persistence/entities/order-line';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderConstants } from './order.fixtures';
import { ShopConstants } from './shop.fixtures';
import { VariantConstants } from './variant.fixtures';

export const OrderLineConstants = {
  ShippedFulfillmentOrderLineID: TestUtils.generateUUID(),
  PickupOrderLineID: TestUtils.generateUUID(),
  PendingFulfillmentOrderLineID: TestUtils.generateUUID()
};

export class OrderLineFixtures implements Fixture<OrderLineTable> {
  table: Tables = Tables.OrderLine;

  async build(): Promise<Partial<OrderLineTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: OrderLineConstants.ShippedFulfillmentOrderLineID,
        order_id: OrderConstants.ShippedFulfillmentOrderID,
        variant_id: VariantConstants.ID,
        quantity: 2,
        unit_price: 5000,
        line_subtotal: 10000,
        line_total: 10000,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderLineConstants.PickupOrderLineID,
        order_id: OrderConstants.PickupOrderID,
        variant_id: VariantConstants.ID,
        quantity: 1,
        unit_price: 5000,
        line_subtotal: 5000,
        line_total: 5000,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderLineConstants.PendingFulfillmentOrderLineID,
        order_id: OrderConstants.PendingFulfillmentOrderID,
        variant_id: VariantConstants.ID,
        quantity: 1,
        unit_price: 5000,
        line_subtotal: 5000,
        line_total: 5000,
        applied_discounts: JSON.stringify([])
      }
    ];
  }
}
