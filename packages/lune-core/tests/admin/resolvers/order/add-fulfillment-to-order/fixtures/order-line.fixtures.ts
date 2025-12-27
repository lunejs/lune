import type { OrderLineTable } from '@/persistence/entities/order-line';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderConstants } from './order.fixtures';
import { ShopConstants } from './shop.fixtures';
import { VariantConstants } from './variant.fixtures';

export const OrderLineConstants = {
  ProcessingOrderLine1ID: TestUtils.generateUUID(),
  ProcessingOrderLine2ID: TestUtils.generateUUID(),
  PlacedOrderLineID: TestUtils.generateUUID(),
  PartiallyFulfilledOrderLine1ID: TestUtils.generateUUID(),
  PartiallyFulfilledOrderLine2ID: TestUtils.generateUUID(),
  ModifyingOrderLineID: TestUtils.generateUUID(),
  CompletedOrderLineID: TestUtils.generateUUID()
};

export class OrderLineFixtures implements Fixture<OrderLineTable> {
  table: Tables = Tables.OrderLine;

  async build(): Promise<Partial<OrderLineTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: OrderLineConstants.ProcessingOrderLine1ID,
        order_id: OrderConstants.ProcessingOrderID,
        variant_id: VariantConstants.ID,
        quantity: 1,
        unit_price: 5000,
        line_subtotal: 5000,
        line_total: 5000,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderLineConstants.ProcessingOrderLine2ID,
        order_id: OrderConstants.ProcessingOrderID,
        variant_id: VariantConstants.ID,
        quantity: 1,
        unit_price: 5000,
        line_subtotal: 5000,
        line_total: 5000,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderLineConstants.PlacedOrderLineID,
        order_id: OrderConstants.PlacedOrderID,
        variant_id: VariantConstants.ID,
        quantity: 1,
        unit_price: 5000,
        line_subtotal: 5000,
        line_total: 5000,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderLineConstants.PartiallyFulfilledOrderLine1ID,
        order_id: OrderConstants.PartiallyFulfilledOrderID,
        variant_id: VariantConstants.ID,
        quantity: 2,
        unit_price: 5000,
        line_subtotal: 10000,
        line_total: 10000,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderLineConstants.PartiallyFulfilledOrderLine2ID,
        order_id: OrderConstants.PartiallyFulfilledOrderID,
        variant_id: VariantConstants.ID,
        quantity: 1,
        unit_price: 5000,
        line_subtotal: 5000,
        line_total: 5000,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderLineConstants.ModifyingOrderLineID,
        order_id: OrderConstants.ModifyingOrderID,
        variant_id: VariantConstants.ID,
        quantity: 1,
        unit_price: 2000,
        line_subtotal: 2000,
        line_total: 2000,
        applied_discounts: JSON.stringify([])
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderLineConstants.CompletedOrderLineID,
        order_id: OrderConstants.CompletedOrderID,
        variant_id: VariantConstants.ID,
        quantity: 1,
        unit_price: 3000,
        line_subtotal: 3000,
        line_total: 3000,
        applied_discounts: JSON.stringify([])
      }
    ];
  }
}
