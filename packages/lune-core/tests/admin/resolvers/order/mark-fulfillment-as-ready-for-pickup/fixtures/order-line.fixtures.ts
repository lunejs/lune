import type { OrderLineTable } from '@/persistence/entities/order-line';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderConstants } from './order.fixtures';
import { ShopConstants } from './shop.fixtures';
import { VariantConstants } from './variant.fixtures';

export const OrderLineConstants = {
  PendingPickupOrderLineID: TestUtils.generateUUID(),
  ShippingOrderLineID: TestUtils.generateUUID(),
  AlreadyReadyOrderLineID: TestUtils.generateUUID()
};

export class OrderLineFixtures implements Fixture<OrderLineTable> {
  table: Tables = Tables.OrderLine;

  async build(): Promise<Partial<OrderLineTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: OrderLineConstants.PendingPickupOrderLineID,
        order_id: OrderConstants.PendingPickupOrderID,
        variant_id: VariantConstants.ID,
        quantity: 2,
        unit_price: 5000,
        line_subtotal: 10000,
        line_total: 10000,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderLineConstants.ShippingOrderLineID,
        order_id: OrderConstants.ShippingOrderID,
        variant_id: VariantConstants.ID,
        quantity: 1,
        unit_price: 5000,
        line_subtotal: 5000,
        line_total: 5000,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderLineConstants.AlreadyReadyOrderLineID,
        order_id: OrderConstants.AlreadyReadyOrderID,
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
