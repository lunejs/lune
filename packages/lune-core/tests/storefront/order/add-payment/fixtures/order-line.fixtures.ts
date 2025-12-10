import { LunePrice } from '@lune/common';

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

  WithoutFulfillmentID: TestUtils.generateUUID(),
  WithoutFulfillmentID2: TestUtils.generateUUID(),

  WithoutCustomerID: TestUtils.generateUUID(),
  WithoutCustomerID2: TestUtils.generateUUID(),

  LowStockID: TestUtils.generateUUID(),

  WithDiscountCodeID: TestUtils.generateUUID(),
  WithDiscountCodeID2: TestUtils.generateUUID()
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
      // with no fulfillment
      {
        id: OrderLineConstants.WithoutFulfillmentID,
        order_id: OrderConstants.WithoutFulfillmentID,
        variant_id: VariantConstants.AlreadyInLineID,
        line_total: LunePrice.toCent(800),
        line_subtotal: LunePrice.toCent(800),
        quantity: 1,
        unit_price: LunePrice.toCent(800),
        shop_id: ShopConstants.ID
      },
      {
        id: OrderLineConstants.WithoutFulfillmentID2,
        order_id: OrderConstants.WithoutFulfillmentID,
        variant_id: VariantConstants.ID,
        line_total: LunePrice.toCent(1_300),
        line_subtotal: LunePrice.toCent(1_300),
        quantity: 1,
        unit_price: LunePrice.toCent(1_300),
        shop_id: ShopConstants.ID
      },
      //with no customer
      {
        id: OrderLineConstants.WithoutCustomerID,
        order_id: OrderConstants.WithoutCustomerID,
        variant_id: VariantConstants.AlreadyInLineID,
        line_total: LunePrice.toCent(800),
        line_subtotal: LunePrice.toCent(800),
        quantity: 1,
        unit_price: LunePrice.toCent(800),
        shop_id: ShopConstants.ID
      },
      {
        id: OrderLineConstants.WithoutCustomerID2,
        order_id: OrderConstants.WithoutCustomerID,
        variant_id: VariantConstants.ID,
        line_total: LunePrice.toCent(1_300),
        line_subtotal: LunePrice.toCent(1_300),
        quantity: 1,
        unit_price: LunePrice.toCent(1_300),
        shop_id: ShopConstants.ID
      },
      // with low stock
      {
        id: OrderLineConstants.LowStockID,
        order_id: OrderConstants.WithLowStockID,
        variant_id: VariantConstants.LowStockID,
        line_total: LunePrice.toCent(500),
        line_subtotal: LunePrice.toCent(500),
        quantity: 1,
        unit_price: LunePrice.toCent(500),
        shop_id: ShopConstants.ID
      },
      // with discount code
      {
        id: OrderLineConstants.WithDiscountCodeID,
        order_id: OrderConstants.WithDiscountCodeID,
        variant_id: VariantConstants.AlreadyInLineID,
        line_total: LunePrice.toCent(800),
        line_subtotal: LunePrice.toCent(800),
        quantity: 1,
        unit_price: LunePrice.toCent(800),
        shop_id: ShopConstants.ID
      },
      {
        id: OrderLineConstants.WithDiscountCodeID2,
        order_id: OrderConstants.WithDiscountCodeID,
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
