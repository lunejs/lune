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

  WithOrderLevelDiscountID: TestUtils.generateUUID(),

  WithOrderLineLevelDiscountID: TestUtils.generateUUID(),
  WithOrderLineLevelDiscountID2: TestUtils.generateUUID(),

  WithDeliveryMethodLevelDiscountID: TestUtils.generateUUID()
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
      // Order with order-level discount (1 line)
      {
        id: OrderLineConstants.WithOrderLevelDiscountID,
        order_id: OrderConstants.WithOrderLevelDiscountID,
        variant_id: VariantConstants.ID,
        line_total: LunePrice.toCent(1_000),
        line_subtotal: LunePrice.toCent(1_000),
        quantity: 1,
        unit_price: LunePrice.toCent(1_000),
        shop_id: ShopConstants.ID,
        applied_discounts: JSON.stringify([])
      },
      // Order with order-line-level discount (2 lines, discount on second line)
      {
        id: OrderLineConstants.WithOrderLineLevelDiscountID,
        order_id: OrderConstants.WithOrderLineLevelDiscountID,
        variant_id: VariantConstants.AlreadyInLineID,
        line_total: LunePrice.toCent(800),
        line_subtotal: LunePrice.toCent(800),
        quantity: 1,
        unit_price: LunePrice.toCent(800),
        shop_id: ShopConstants.ID,
        applied_discounts: JSON.stringify([])
      },
      {
        id: OrderLineConstants.WithOrderLineLevelDiscountID2,
        order_id: OrderConstants.WithOrderLineLevelDiscountID,
        variant_id: VariantConstants.ID,
        line_total: LunePrice.toCent(700), // 1000 - 300 discount
        line_subtotal: LunePrice.toCent(1_000),
        quantity: 1,
        unit_price: LunePrice.toCent(1_000),
        shop_id: ShopConstants.ID,
        applied_discounts: JSON.stringify([
          {
            code: 'AUTOMATIC_ORDER_LINE_DISCOUNT',
            applicationMode: 'AUTOMATIC',
            applicationLevel: 'ORDER_LINE',
            amount: LunePrice.toCent(300)
          }
        ])
      },
      // Order with delivery-method-level discount (1 line)
      {
        id: OrderLineConstants.WithDeliveryMethodLevelDiscountID,
        order_id: OrderConstants.WithDeliveryMethodLevelDiscountID,
        variant_id: VariantConstants.ID,
        line_total: LunePrice.toCent(1_000),
        line_subtotal: LunePrice.toCent(1_000),
        quantity: 1,
        unit_price: LunePrice.toCent(1_000),
        shop_id: ShopConstants.ID,
        applied_discounts: JSON.stringify([])
      }
    ];
  }
}
