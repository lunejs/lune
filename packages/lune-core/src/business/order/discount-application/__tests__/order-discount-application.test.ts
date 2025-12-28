import { LunePrice } from '@lune/common';

import { ApplicationLevel, ApplicationMode } from '@/persistence/entities/discount';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderDiscountApplication } from '../order-discount-application';

import { CustomerConstants, CustomerFixtures } from './fixtures/customer.fixtures';
import { DeliveryMethodFixtures } from './fixtures/delivery-method.fixtures';
import { DiscountConstants, DiscountFixtures } from './fixtures/discount.fixtures';
import { OptionFixtures } from './fixtures/option.fixtures';
import { OptionValueFixtures } from './fixtures/option-value.fixtures';
import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import { OrderDiscountFixtures } from './fixtures/order-discount.fixtures';
import { OrderLineFixtures } from './fixtures/order-line.fixtures';
import { ProductFixtures } from './fixtures/product.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';
import { VariantConstants, VariantFixtures } from './fixtures/variant.fixtures';
import { VariantOptionValueFixtures } from './fixtures/variant-option-value.fixtures';

describe('DiscountApplication', () => {
  const testUtils = new TestUtils();

  let ctx: Awaited<ReturnType<typeof testUtils.buildContext>>;
  let discountApplication: OrderDiscountApplication;

  beforeEach(async () => {
    await testUtils.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new CustomerFixtures(),
      new ProductFixtures(),
      new VariantFixtures(),
      new OptionFixtures(),
      new OptionValueFixtures(),
      new VariantOptionValueFixtures(),
      new OrderFixtures(),
      new OrderLineFixtures(),
      new DeliveryMethodFixtures(),
      new DiscountFixtures(),
      new OrderDiscountFixtures()
    ]);

    testUtils.initTestConfig();

    ctx = await testUtils.buildContext(ShopConstants.ID, {
      email: 'test@example.com',
      sub: CustomerConstants.ID
    });

    discountApplication = new OrderDiscountApplication(ctx);
  });

  afterEach(async () => {
    await ctx.trx.rollback();
    await testUtils.resetDatabase();
  });

  afterAll(async () => {
    await testUtils.destroyDatabase();
  });

  describe('applyAvailable', () => {
    test('applies the best discount (ORDER LEVEL) when multiple available', async () => {
      const order = await ctx.repositories.order.findOneOrThrow({
        where: { id: OrderConstants.ID }
      });

      const result = await discountApplication.applyAvailable(order);

      expect(result).toMatchObject({
        id: OrderConstants.ID,
        code: null,
        state: 'modifying',
        total: LunePrice.toCent(1_800),
        subtotal: LunePrice.toCent(1_600),
        totalQuantity: 2,
        appliedDiscounts: [
          {
            code: DiscountConstants.OrderAutomaticDiscountCode,
            discountedAmount: LunePrice.toCent(500),
            applicationMode: ApplicationMode.Automatic,
            applicationLevel: ApplicationLevel.Order
          }
        ]
      });
    });

    test('applies the best discount (ORDER LINE LEVEL) when it gives more discount', async () => {
      const order = await ctx.repositories.order.findOneOrThrow({
        where: { id: OrderConstants.ForOrderLineLevelID }
      });

      const result = await discountApplication.applyAvailable(order);

      // OrderLine discount ($600) > Order discount ($500), so OrderLine wins
      // Only applies to line with VariantConstants.ID ($1300 -> $700)
      // Other line ($800) stays unchanged
      // New subtotal: 800 + 700 = 1500
      // New total: 1500 + 200 = 1700
      expect(result).toMatchObject({
        id: OrderConstants.ForOrderLineLevelID,
        subtotal: LunePrice.toCent(1_500),
        total: LunePrice.toCent(1_700)
      });

      // Verify the discount was applied to the correct line
      const lines = await ctx.repositories.orderLine.findMany({
        where: { orderId: OrderConstants.ForOrderLineLevelID }
      });

      const discountedLine = lines.find(
        l => l.variantId === VariantConstants.ForOrderLineLevelDiscountID
      );
      const unchangedLine = lines.find(l => l.variantId === VariantConstants.AlreadyInLineID);

      expect(discountedLine).toMatchObject({
        lineSubtotal: LunePrice.toCent(1_300),
        lineTotal: LunePrice.toCent(700), // 1300 - 600
        appliedDiscounts: [
          {
            code: DiscountConstants.OrderLineAutomaticDiscountCode,
            discountedAmount: LunePrice.toCent(600),
            applicationMode: ApplicationMode.Automatic,
            applicationLevel: ApplicationLevel.OrderLine
          }
        ]
      });

      expect(unchangedLine).toMatchObject({
        lineSubtotal: LunePrice.toCent(800),
        lineTotal: LunePrice.toCent(800),
        appliedDiscounts: []
      });
    });

    test('applies the best discount (DELIVERY_METHOD LEVEL) when it gives more discount', async () => {
      const order = await ctx.repositories.order.findOneOrThrow({
        where: { id: OrderConstants.ForDeliveryMethodLevelID }
      });

      const result = await discountApplication.applyAvailable(order);

      // DeliveryMethod discount ($550) applies to delivery method ($600 -> $50)
      // Subtotal stays same: $2100
      // New total: 2100 + 50 = 2150
      expect(result).toMatchObject({
        id: OrderConstants.ForDeliveryMethodLevelID,
        subtotal: LunePrice.toCent(2_100),
        total: LunePrice.toCent(2_150),
        appliedDiscounts: [
          {
            code: DiscountConstants.DeliveryMethodAutomaticDiscountCode,
            discountedAmount: LunePrice.toCent(550),
            applicationMode: ApplicationMode.Automatic,
            applicationLevel: ApplicationLevel.DeliveryMethod
          }
        ]
      });

      // Verify delivery method was updated
      const deliveryMethod = await ctx.repositories.deliveryMethod.findOne({
        where: { orderId: OrderConstants.ForDeliveryMethodLevelID }
      });

      expect(deliveryMethod).toMatchObject({
        amount: LunePrice.toCent(600),
        total: LunePrice.toCent(50) // 600 - 550
      });
    });

    test('applies ORDER level discount when DELIVERY_METHOD discount exists but order has no delivery method', async () => {
      const order = await ctx.repositories.order.findOneOrThrow({
        where: { id: OrderConstants.WithoutDeliveryMethodID }
      });

      const result = await discountApplication.applyAvailable(order);

      // DeliveryMethod discount ($600) exists but order has no delivery method, so discountedAmount = 0
      // Order discount ($500) wins because it has higher discountedAmount
      expect(result).toMatchObject({
        id: OrderConstants.WithoutDeliveryMethodID,
        subtotal: LunePrice.toCent(1_600), // 2100 - 500
        total: LunePrice.toCent(1_600), // No delivery method
        appliedDiscounts: [
          {
            code: DiscountConstants.OrderAutomaticDiscountCode,
            discountedAmount: LunePrice.toCent(500),
            applicationMode: ApplicationMode.Automatic,
            applicationLevel: ApplicationLevel.Order
          }
        ]
      });
    });

    test('applies already stored discount code over any automatic discount', async () => {
      const order = await ctx.repositories.order.findOneOrThrow({
        where: { id: OrderConstants.WithCodeDiscountID }
      });

      const result = await discountApplication.applyAvailable(order);

      expect(result).toMatchObject({
        id: OrderConstants.WithCodeDiscountID,
        subtotal: LunePrice.toCent(2_000),
        total: LunePrice.toCent(2_200),
        appliedDiscounts: [
          {
            code: DiscountConstants.OrderDiscountCode,
            discountedAmount: LunePrice.toCent(100),
            applicationMode: ApplicationMode.Code,
            applicationLevel: ApplicationLevel.Order
          }
        ]
      });
    });

    test('removes applied discount when does not exists', async () => {
      const order = await ctx.repositories.order.findOneOrThrow({
        where: { id: OrderConstants.WithNonExistentDiscountID }
      });

      const result = await discountApplication.applyAvailable(order);

      expect(result).toMatchObject({
        id: OrderConstants.WithNonExistentDiscountID,
        subtotal: LunePrice.toCent(1_600),
        total: LunePrice.toCent(1_800),
        appliedDiscounts: [
          {
            code: DiscountConstants.OrderAutomaticDiscountCode,
            discountedAmount: LunePrice.toCent(500),
            applicationMode: ApplicationMode.Automatic,
            applicationLevel: ApplicationLevel.Order
          }
        ]
      });
    });

    test('removes applied discount when is disabled', async () => {
      const order = await ctx.repositories.order.findOneOrThrow({
        where: { id: OrderConstants.WithDisabledDiscountID }
      });

      const result = await discountApplication.applyAvailable(order);

      expect(result).toMatchObject({
        id: OrderConstants.WithDisabledDiscountID,
        subtotal: LunePrice.toCent(1_600),
        total: LunePrice.toCent(1_800),
        appliedDiscounts: [
          {
            code: DiscountConstants.OrderAutomaticDiscountCode,
            discountedAmount: LunePrice.toCent(500),
            applicationMode: ApplicationMode.Automatic,
            applicationLevel: ApplicationLevel.Order
          }
        ]
      });
    });

    test('removes applied discount when is premature to today date', async () => {
      const order = await ctx.repositories.order.findOneOrThrow({
        where: { id: OrderConstants.WithPrematureDiscountID }
      });

      const result = await discountApplication.applyAvailable(order);

      expect(result).toMatchObject({
        id: OrderConstants.WithPrematureDiscountID,
        subtotal: LunePrice.toCent(1_600),
        total: LunePrice.toCent(1_800),
        appliedDiscounts: [
          {
            code: DiscountConstants.OrderAutomaticDiscountCode,
            discountedAmount: LunePrice.toCent(500),
            applicationMode: ApplicationMode.Automatic,
            applicationLevel: ApplicationLevel.Order
          }
        ]
      });
    });

    test('removes applied discount when is expired', async () => {
      const order = await ctx.repositories.order.findOneOrThrow({
        where: { id: OrderConstants.WithExpiredDiscountID }
      });

      const result = await discountApplication.applyAvailable(order);

      expect(result).toMatchObject({
        id: OrderConstants.WithExpiredDiscountID,
        subtotal: LunePrice.toCent(1_600),
        total: LunePrice.toCent(1_800),
        appliedDiscounts: [
          {
            code: DiscountConstants.OrderAutomaticDiscountCode,
            discountedAmount: LunePrice.toCent(500),
            applicationMode: ApplicationMode.Automatic,
            applicationLevel: ApplicationLevel.Order
          }
        ]
      });
    });

    test('removes applied discount when exceeds per customer limit', async () => {
      const order = await ctx.repositories.order.findOneOrThrow({
        where: { id: OrderConstants.WithLimitExceededDiscountID }
      });

      const result = await discountApplication.applyAvailable(order);

      expect(result).toMatchObject({
        id: OrderConstants.WithLimitExceededDiscountID,
        subtotal: LunePrice.toCent(1_600),
        total: LunePrice.toCent(1_800),
        appliedDiscounts: [
          {
            code: DiscountConstants.OrderAutomaticDiscountCode,
            discountedAmount: LunePrice.toCent(500),
            applicationMode: ApplicationMode.Automatic,
            applicationLevel: ApplicationLevel.Order
          }
        ]
      });
    });
  });

  describe('isValid', () => {
    test('returns true when provided discount is valid', async () => {
      const discount = await ctx.repositories.discount.findOneOrThrow({
        where: { code: DiscountConstants.OrderAutomaticDiscountCode }
      });

      const order = await ctx.repositories.order.findOneOrThrow({
        where: { id: OrderConstants.ID }
      });

      const result = await discountApplication.isValid(discount, order);

      expect(result).toBe(true);
    });

    test('returns false when provided discount is disabled', async () => {
      const discount = await ctx.repositories.discount.findOneOrThrow({
        where: { id: DiscountConstants.DisabledDiscountID }
      });

      const order = await ctx.repositories.order.findOneOrThrow({
        where: { id: OrderConstants.ID }
      });

      const result = await discountApplication.isValid(discount, order);

      expect(result).toBe(false);
    });

    test('returns false when provided discount is premature to today date', async () => {
      const discount = await ctx.repositories.discount.findOneOrThrow({
        where: { id: DiscountConstants.PrematureDiscountID }
      });

      const order = await ctx.repositories.order.findOneOrThrow({
        where: { id: OrderConstants.ID }
      });

      const result = await discountApplication.isValid(discount, order);

      expect(result).toBe(false);
    });

    test('returns false when provided discount is expired', async () => {
      const discount = await ctx.repositories.discount.findOneOrThrow({
        where: { id: DiscountConstants.ExpiredDiscountID }
      });

      const order = await ctx.repositories.order.findOneOrThrow({
        where: { id: OrderConstants.ID }
      });

      const result = await discountApplication.isValid(discount, order);

      expect(result).toBe(false);
    });

    test('returns false when provided discount exceeds per customer limit', async () => {
      const discount = await ctx.repositories.discount.findOneOrThrow({
        where: { id: DiscountConstants.LimitExceededDiscountID }
      });

      const order = await ctx.repositories.order.findOneOrThrow({
        where: { id: OrderConstants.WithLimitExceededDiscountID }
      });

      const result = await discountApplication.isValid(discount, order);

      expect(result).toBe(false);
    });

    test('returns true when order has no customer and discount has perCustomerLimit', async () => {
      const discount = await ctx.repositories.discount.findOneOrThrow({
        where: { id: DiscountConstants.LimitExceededDiscountID }
      });

      const order = await ctx.repositories.order.findOneOrThrow({
        where: { id: OrderConstants.WithoutCustomerID }
      });

      const result = await discountApplication.isValid(discount, order);

      expect(result).toBe(true);
    });
  });

  describe('clean', () => {
    test('removes all applied discounts from an order and resets values', async () => {
      const result = await discountApplication.clean(OrderConstants.WithCodeDiscountID);

      expect(result).toMatchObject({
        id: OrderConstants.WithCodeDiscountID,
        subtotal: LunePrice.toCent(2_100),
        total: LunePrice.toCent(2_300),
        appliedDiscounts: []
      });

      // Verify order lines were cleaned
      const lines = await ctx.repositories.orderLine.findMany({
        where: { orderId: OrderConstants.WithCodeDiscountID }
      });

      for (const line of lines) {
        expect(line.lineTotal).toBe(line.lineSubtotal);
        expect(line.appliedDiscounts).toEqual([]);
      }

      // Verify delivery method was cleaned
      const deliveryMethod = await ctx.repositories.deliveryMethod.findOne({
        where: { orderId: OrderConstants.WithCodeDiscountID }
      });

      expect(deliveryMethod?.total).toBe(deliveryMethod?.amount);
    });

    test('removes all applied discounts from an order without delivery method', async () => {
      const order = await ctx.repositories.order.findOneOrThrow({
        where: { id: OrderConstants.WithoutDeliveryMethodID }
      });

      await discountApplication.applyAvailable(order);

      const result = await discountApplication.clean(OrderConstants.WithoutDeliveryMethodID);

      expect(result).toMatchObject({
        id: OrderConstants.WithoutDeliveryMethodID,
        subtotal: LunePrice.toCent(2_100),
        total: LunePrice.toCent(2_100), // No delivery method
        appliedDiscounts: []
      });

      // Verify order lines were cleaned
      const lines = await ctx.repositories.orderLine.findMany({
        where: { orderId: OrderConstants.WithoutDeliveryMethodID }
      });

      for (const line of lines) {
        expect(line.lineTotal).toBe(line.lineSubtotal);
        expect(line.appliedDiscounts).toEqual([]);
      }

      // Verify no delivery method exists
      const deliveryMethod = await ctx.repositories.deliveryMethod.findOne({
        where: { orderId: OrderConstants.WithoutDeliveryMethodID }
      });

      expect(deliveryMethod).toBeUndefined();
    });
  });
});
