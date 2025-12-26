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

  WithCodeDiscountID: TestUtils.generateUUID(),
  WithCodeDiscountID2: TestUtils.generateUUID(),

  WithNonExistentDiscountID: TestUtils.generateUUID(),
  WithNonExistentDiscountID2: TestUtils.generateUUID(),

  WithDisabledDiscountID: TestUtils.generateUUID(),
  WithDisabledDiscountID2: TestUtils.generateUUID(),

  WithPrematureDiscountID: TestUtils.generateUUID(),
  WithPrematureDiscountID2: TestUtils.generateUUID(),

  WithExpiredDiscountID: TestUtils.generateUUID(),
  WithExpiredDiscountID2: TestUtils.generateUUID(),

  WithLimitExceededDiscountID: TestUtils.generateUUID(),
  WithLimitExceededDiscountID2: TestUtils.generateUUID(),

  ForOrderLineLevelID: TestUtils.generateUUID(),
  ForOrderLineLevelID2: TestUtils.generateUUID(),

  ForDeliveryMethodLevelID: TestUtils.generateUUID(),
  ForDeliveryMethodLevelID2: TestUtils.generateUUID(),

  WithoutDeliveryMethodID: TestUtils.generateUUID(),
  WithoutDeliveryMethodID2: TestUtils.generateUUID(),

  WithoutCustomerID: TestUtils.generateUUID(),
  WithoutCustomerID2: TestUtils.generateUUID()
};

export class OrderLineFixtures implements Fixture<OrderLineTable> {
  table: Tables = Tables.OrderLine;

  async build(): Promise<Partial<OrderLineTable>[]> {
    return [
      // Base order (2 lines, subtotal = $2100)
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
      // Order with CODE discount (2 lines, subtotal = $2100)
      {
        id: OrderLineConstants.WithCodeDiscountID,
        order_id: OrderConstants.WithCodeDiscountID,
        variant_id: VariantConstants.AlreadyInLineID,
        line_total: LunePrice.toCent(800),
        line_subtotal: LunePrice.toCent(800),
        quantity: 1,
        unit_price: LunePrice.toCent(800),
        shop_id: ShopConstants.ID,
        applied_discounts: JSON.stringify([])
      },
      {
        id: OrderLineConstants.WithCodeDiscountID2,
        order_id: OrderConstants.WithCodeDiscountID,
        variant_id: VariantConstants.ID,
        line_total: LunePrice.toCent(1_300),
        line_subtotal: LunePrice.toCent(1_300),
        quantity: 1,
        unit_price: LunePrice.toCent(1_300),
        shop_id: ShopConstants.ID,
        applied_discounts: JSON.stringify([])
      },
      // Order with non-existent discount (2 lines, subtotal = $2100)
      {
        id: OrderLineConstants.WithNonExistentDiscountID,
        order_id: OrderConstants.WithNonExistentDiscountID,
        variant_id: VariantConstants.AlreadyInLineID,
        line_total: LunePrice.toCent(800),
        line_subtotal: LunePrice.toCent(800),
        quantity: 1,
        unit_price: LunePrice.toCent(800),
        shop_id: ShopConstants.ID,
        applied_discounts: JSON.stringify([])
      },
      {
        id: OrderLineConstants.WithNonExistentDiscountID2,
        order_id: OrderConstants.WithNonExistentDiscountID,
        variant_id: VariantConstants.ID,
        line_total: LunePrice.toCent(1_300),
        line_subtotal: LunePrice.toCent(1_300),
        quantity: 1,
        unit_price: LunePrice.toCent(1_300),
        shop_id: ShopConstants.ID,
        applied_discounts: JSON.stringify([])
      },
      // Order with disabled discount (2 lines, subtotal = $2100)
      {
        id: OrderLineConstants.WithDisabledDiscountID,
        order_id: OrderConstants.WithDisabledDiscountID,
        variant_id: VariantConstants.AlreadyInLineID,
        line_total: LunePrice.toCent(800),
        line_subtotal: LunePrice.toCent(800),
        quantity: 1,
        unit_price: LunePrice.toCent(800),
        shop_id: ShopConstants.ID,
        applied_discounts: JSON.stringify([])
      },
      {
        id: OrderLineConstants.WithDisabledDiscountID2,
        order_id: OrderConstants.WithDisabledDiscountID,
        variant_id: VariantConstants.ID,
        line_total: LunePrice.toCent(1_300),
        line_subtotal: LunePrice.toCent(1_300),
        quantity: 1,
        unit_price: LunePrice.toCent(1_300),
        shop_id: ShopConstants.ID,
        applied_discounts: JSON.stringify([])
      },
      // Order with premature discount (2 lines, subtotal = $2100)
      {
        id: OrderLineConstants.WithPrematureDiscountID,
        order_id: OrderConstants.WithPrematureDiscountID,
        variant_id: VariantConstants.AlreadyInLineID,
        line_total: LunePrice.toCent(800),
        line_subtotal: LunePrice.toCent(800),
        quantity: 1,
        unit_price: LunePrice.toCent(800),
        shop_id: ShopConstants.ID,
        applied_discounts: JSON.stringify([])
      },
      {
        id: OrderLineConstants.WithPrematureDiscountID2,
        order_id: OrderConstants.WithPrematureDiscountID,
        variant_id: VariantConstants.ID,
        line_total: LunePrice.toCent(1_300),
        line_subtotal: LunePrice.toCent(1_300),
        quantity: 1,
        unit_price: LunePrice.toCent(1_300),
        shop_id: ShopConstants.ID,
        applied_discounts: JSON.stringify([])
      },
      // Order with expired discount (2 lines, subtotal = $2100)
      {
        id: OrderLineConstants.WithExpiredDiscountID,
        order_id: OrderConstants.WithExpiredDiscountID,
        variant_id: VariantConstants.AlreadyInLineID,
        line_total: LunePrice.toCent(800),
        line_subtotal: LunePrice.toCent(800),
        quantity: 1,
        unit_price: LunePrice.toCent(800),
        shop_id: ShopConstants.ID,
        applied_discounts: JSON.stringify([])
      },
      {
        id: OrderLineConstants.WithExpiredDiscountID2,
        order_id: OrderConstants.WithExpiredDiscountID,
        variant_id: VariantConstants.ID,
        line_total: LunePrice.toCent(1_300),
        line_subtotal: LunePrice.toCent(1_300),
        quantity: 1,
        unit_price: LunePrice.toCent(1_300),
        shop_id: ShopConstants.ID,
        applied_discounts: JSON.stringify([])
      },
      // Order with limit exceeded discount (2 lines, subtotal = $2100)
      {
        id: OrderLineConstants.WithLimitExceededDiscountID,
        order_id: OrderConstants.WithLimitExceededDiscountID,
        variant_id: VariantConstants.AlreadyInLineID,
        line_total: LunePrice.toCent(800),
        line_subtotal: LunePrice.toCent(800),
        quantity: 1,
        unit_price: LunePrice.toCent(800),
        shop_id: ShopConstants.ID,
        applied_discounts: JSON.stringify([])
      },
      {
        id: OrderLineConstants.WithLimitExceededDiscountID2,
        order_id: OrderConstants.WithLimitExceededDiscountID,
        variant_id: VariantConstants.ID,
        line_total: LunePrice.toCent(1_300),
        line_subtotal: LunePrice.toCent(1_300),
        quantity: 1,
        unit_price: LunePrice.toCent(1_300),
        shop_id: ShopConstants.ID,
        applied_discounts: JSON.stringify([])
      },
      // Order for OrderLine level discount test (2 lines, subtotal = $2100)
      {
        id: OrderLineConstants.ForOrderLineLevelID,
        order_id: OrderConstants.ForOrderLineLevelID,
        variant_id: VariantConstants.AlreadyInLineID, // $800 - discount does NOT apply
        line_total: LunePrice.toCent(800),
        line_subtotal: LunePrice.toCent(800),
        quantity: 1,
        unit_price: LunePrice.toCent(800),
        shop_id: ShopConstants.ID,
        applied_discounts: JSON.stringify([])
      },
      {
        id: OrderLineConstants.ForOrderLineLevelID2,
        order_id: OrderConstants.ForOrderLineLevelID,
        variant_id: VariantConstants.ForOrderLineLevelDiscountID, // $1300 - discount APPLIES ($600 off)
        line_total: LunePrice.toCent(1_300),
        line_subtotal: LunePrice.toCent(1_300),
        quantity: 1,
        unit_price: LunePrice.toCent(1_300),
        shop_id: ShopConstants.ID,
        applied_discounts: JSON.stringify([])
      },
      // Order for DeliveryMethod level discount test (2 lines, subtotal = $2100)
      {
        id: OrderLineConstants.ForDeliveryMethodLevelID,
        order_id: OrderConstants.ForDeliveryMethodLevelID,
        variant_id: VariantConstants.AlreadyInLineID,
        line_total: LunePrice.toCent(800),
        line_subtotal: LunePrice.toCent(800),
        quantity: 1,
        unit_price: LunePrice.toCent(800),
        shop_id: ShopConstants.ID,
        applied_discounts: JSON.stringify([])
      },
      {
        id: OrderLineConstants.ForDeliveryMethodLevelID2,
        order_id: OrderConstants.ForDeliveryMethodLevelID,
        variant_id: VariantConstants.ID,
        line_total: LunePrice.toCent(1_300),
        line_subtotal: LunePrice.toCent(1_300),
        quantity: 1,
        unit_price: LunePrice.toCent(1_300),
        shop_id: ShopConstants.ID,
        applied_discounts: JSON.stringify([])
      },
      // Order without delivery method (2 lines, subtotal = $2100)
      {
        id: OrderLineConstants.WithoutDeliveryMethodID,
        order_id: OrderConstants.WithoutDeliveryMethodID,
        variant_id: VariantConstants.AlreadyInLineID,
        line_total: LunePrice.toCent(800),
        line_subtotal: LunePrice.toCent(800),
        quantity: 1,
        unit_price: LunePrice.toCent(800),
        shop_id: ShopConstants.ID,
        applied_discounts: JSON.stringify([])
      },
      {
        id: OrderLineConstants.WithoutDeliveryMethodID2,
        order_id: OrderConstants.WithoutDeliveryMethodID,
        variant_id: VariantConstants.ID,
        line_total: LunePrice.toCent(1_300),
        line_subtotal: LunePrice.toCent(1_300),
        quantity: 1,
        unit_price: LunePrice.toCent(1_300),
        shop_id: ShopConstants.ID,
        applied_discounts: JSON.stringify([])
      },
      // Order without customer (2 lines, subtotal = $2100)
      {
        id: OrderLineConstants.WithoutCustomerID,
        order_id: OrderConstants.WithoutCustomerID,
        variant_id: VariantConstants.AlreadyInLineID,
        line_total: LunePrice.toCent(800),
        line_subtotal: LunePrice.toCent(800),
        quantity: 1,
        unit_price: LunePrice.toCent(800),
        shop_id: ShopConstants.ID,
        applied_discounts: JSON.stringify([])
      },
      {
        id: OrderLineConstants.WithoutCustomerID2,
        order_id: OrderConstants.WithoutCustomerID,
        variant_id: VariantConstants.ID,
        line_total: LunePrice.toCent(1_300),
        line_subtotal: LunePrice.toCent(1_300),
        quantity: 1,
        unit_price: LunePrice.toCent(1_300),
        shop_id: ShopConstants.ID,
        applied_discounts: JSON.stringify([])
      }
    ];
  }
}
