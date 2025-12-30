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

  WithoutDeliveryMethodID: TestUtils.generateUUID(),
  WithoutDeliveryMethodID2: TestUtils.generateUUID(),

  WithoutCustomerID: TestUtils.generateUUID(),
  WithoutCustomerID2: TestUtils.generateUUID(),

  LowStockID: TestUtils.generateUUID(),

  WithDiscountCodeID: TestUtils.generateUUID(),
  WithDiscountCodeID2: TestUtils.generateUUID(),

  WithOrderLineDiscountID: TestUtils.generateUUID(),
  WithOrderLineDiscountID2: TestUtils.generateUUID(),

  WithDeliveryMethodDiscountID: TestUtils.generateUUID(),
  WithDeliveryMethodDiscountID2: TestUtils.generateUUID()
};

export class OrderLineFixtures implements Fixture<OrderLineTable> {
  table: Tables = Tables.OrderLine;

  async build(): Promise<Partial<OrderLineTable>[]> {
    return [
      // with delivery method
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
      // with no delivery method
      {
        id: OrderLineConstants.WithoutDeliveryMethodID,
        order_id: OrderConstants.WithoutDeliveryMethodID,
        variant_id: VariantConstants.AlreadyInLineID,
        line_total: LunePrice.toCent(800),
        line_subtotal: LunePrice.toCent(800),
        quantity: 1,
        unit_price: LunePrice.toCent(800),
        shop_id: ShopConstants.ID
      },
      {
        id: OrderLineConstants.WithoutDeliveryMethodID2,
        order_id: OrderConstants.WithoutDeliveryMethodID,
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
      },
      // with order line discount
      {
        id: OrderLineConstants.WithOrderLineDiscountID,
        order_id: OrderConstants.WithOrderLineDiscountID,
        variant_id: VariantConstants.AlreadyInLineID,
        line_total: LunePrice.toCent(800),
        line_subtotal: LunePrice.toCent(800),
        quantity: 1,
        unit_price: LunePrice.toCent(800),
        shop_id: ShopConstants.ID
      },
      {
        id: OrderLineConstants.WithOrderLineDiscountID2,
        order_id: OrderConstants.WithOrderLineDiscountID,
        variant_id: VariantConstants.ID,
        line_total: LunePrice.toCent(1_300),
        line_subtotal: LunePrice.toCent(1_300),
        quantity: 1,
        unit_price: LunePrice.toCent(1_300),
        shop_id: ShopConstants.ID,
        applied_discounts: JSON.stringify([
          {
            code: 'ORDER_LINE_DISCOUNT',
            applicationMode: 'CODE',
            applicationLevel: 'ORDER_LINE',
            amount: 0
          }
        ])
      },
      // with delivery method discount
      {
        id: OrderLineConstants.WithDeliveryMethodDiscountID,
        order_id: OrderConstants.WithDeliveryMethodDiscountID,
        variant_id: VariantConstants.AlreadyInLineID,
        line_total: LunePrice.toCent(800),
        line_subtotal: LunePrice.toCent(800),
        quantity: 1,
        unit_price: LunePrice.toCent(800),
        shop_id: ShopConstants.ID
      },
      {
        id: OrderLineConstants.WithDeliveryMethodDiscountID2,
        order_id: OrderConstants.WithDeliveryMethodDiscountID,
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
