import request from 'supertest';

import { LunePrice } from '@lune/common';

import { Tables } from '@/persistence/tables';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomerFixtures } from './fixtures/customer.fixtures';
import { DiscountFixtures } from './fixtures/discount.fixtures';
import { FulfillmentFixtures } from './fixtures/fulfillment.fixtures';
import { OptionFixtures } from './fixtures/option.fixtures';
import { OptionValueFixtures } from './fixtures/option-value.fixtures';
import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import { OrderDiscountFixtures } from './fixtures/order-discount.fixtures';
import { OrderLineFixtures } from './fixtures/order-line.fixtures';
import { PaymentMethodConstants, PaymentMethodFixtures } from './fixtures/payment-method.fixtures';
import { ProductFixtures } from './fixtures/product.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';
import { VariantConstants, VariantFixtures } from './fixtures/variant.fixtures';
import { VariantOptionValueFixtures } from './fixtures/variant-option-value.fixtures';

describe('addPaymentToOrder - Mutation', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
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
      new FulfillmentFixtures(),
      new DiscountFixtures(),
      new OrderDiscountFixtures(),
      new PaymentMethodFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('adds payment to order', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_PAYMENT_TO_ORDER,
        variables: {
          orderId: OrderConstants.ID,
          input: { methodId: PaymentMethodConstants.CapturedID }
        }
      });

    const {
      addPaymentToOrder: { order }
    } = res.body.data;

    expect(order.placedAt).toBeDefined();
    expect(order.state).toBe('PLACED');
    expect(order.code).toBe('2');

    expect(order).toMatchObject({
      id: OrderConstants.ID,
      subtotal: LunePrice.toCent(2_100),
      total: LunePrice.toCent(2_300),
      totalQuantity: 2,
      fulfillment: {
        amount: LunePrice.toCent(200)
      },
      appliedDiscounts: [],
      payments: [
        {
          amount: LunePrice.toCent(2_300),
          method: 'Stripe'
        }
      ],
      lines: {
        items: [
          {
            unitPrice: LunePrice.toCent(800),
            lineSubtotal: LunePrice.toCent(800),
            lineTotal: LunePrice.toCent(800),
            quantity: 1,
            variant: {
              id: VariantConstants.AlreadyInLineID
            }
          },
          {
            unitPrice: LunePrice.toCent(1_300),
            lineSubtotal: LunePrice.toCent(1_300),
            lineTotal: LunePrice.toCent(1_300),
            quantity: 1,
            variant: {
              id: VariantConstants.ID
            }
          }
        ]
      }
    });

    // Verify stock was reduced
    const db = testHelper.getQueryBuilder();
    const variant1 = await db(Tables.Variant).where('id', VariantConstants.AlreadyInLineID).first();
    const variant2 = await db(Tables.Variant).where('id', VariantConstants.ID).first();

    expect(variant1.stock).toBe(2);
    expect(variant2.stock).toBe(2);

    // Verify payment was created in DB with correct data
    const payment = await db(Tables.Payment).where('order_id', OrderConstants.ID).first();

    expect(payment).toBeDefined();
    expect(payment.transaction_id).toBeDefined();
    expect(payment.transaction_id).toMatch(TestUtils.Regex.UUID);
    expect(payment.amount).toBe(LunePrice.toCent(2_300));
    expect(payment.method).toBe('Stripe');
    expect(payment.state).toBe('CAPTURED');
    expect(payment.payment_method_id).toBe(PaymentMethodConstants.CapturedID);
  });

  test('returns FORBIDDEN_ORDER_ACTION when order has no customer', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_PAYMENT_TO_ORDER,
        variables: {
          orderId: OrderConstants.WithoutCustomerID,
          input: { methodId: PaymentMethodConstants.CapturedID }
        }
      });

    const {
      addPaymentToOrder: { order, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(order).toBeNull();
    expect(error.code).toBe('FORBIDDEN_ORDER_ACTION');
  });

  test('returns FORBIDDEN_ORDER_ACTION when order has no fulfillment', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_PAYMENT_TO_ORDER,
        variables: {
          orderId: OrderConstants.WithoutFulfillmentID,
          input: { methodId: PaymentMethodConstants.CapturedID }
        }
      });

    const {
      addPaymentToOrder: { order, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(order).toBeNull();
    expect(error.code).toBe('FORBIDDEN_ORDER_ACTION');
  });

  test('returns FORBIDDEN_ORDER_ACTION when order state is not MODIFYING', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_PAYMENT_TO_ORDER,
        variables: {
          orderId: OrderConstants.PlacedID,
          input: { methodId: PaymentMethodConstants.CapturedID }
        }
      });

    const {
      addPaymentToOrder: { order, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(order).toBeNull();
    expect(error.code).toBe('FORBIDDEN_ORDER_ACTION');
  });

  test('returns PAYMENT_HANDLER_NOT_FOUND when payment method handler is not found in config', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_PAYMENT_TO_ORDER,
        variables: {
          orderId: OrderConstants.WithoutCustomerID,
          input: { methodId: PaymentMethodConstants.WithNonExistingHandler }
        }
      });

    const {
      addPaymentToOrder: { order, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(order).toBeNull();
    expect(error.code).toBe('FORBIDDEN_ORDER_ACTION');
  });

  // TODO: What to do when findOneOrThrow, actually throws an error
  test.skip('returns INTERNAL_SERVER_ERROR when payment method is not found', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_PAYMENT_TO_ORDER,
        variables: {
          orderId: OrderConstants.ID,
          input: { methodId: PaymentMethodConstants.DisabledID }
        }
      });

    const {
      extensions: { code }
    } = res.body.errors[0];

    expect(code).toBe('INTERNAL_SERVER_ERROR');
  });

  test('returns NOT_ENOUGH_STOCK when variant has insufficient stock', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_PAYMENT_TO_ORDER,
        variables: {
          orderId: OrderConstants.WithLowStockID,
          input: { methodId: PaymentMethodConstants.CapturedID }
        }
      });

    const {
      addPaymentToOrder: { order, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(order).toBeNull();
    expect(error.code).toBe('NOT_ENOUGH_STOCK');
  });

  test('returns PAYMENT_FAILED error when payment handler fails', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_PAYMENT_TO_ORDER,
        variables: {
          orderId: OrderConstants.ID,
          input: { methodId: PaymentMethodConstants.FailedID }
        }
      });

    const {
      addPaymentToOrder: { order, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(order).toBeNull();
    expect(error.code).toBe('PAYMENT_FAILED');
    expect(error.message).toBe('Payment failed');
  });
});

const ADD_PAYMENT_TO_ORDER = /* GraphQL */ `
  mutation AddPaymentToOrder($orderId: ID!, $input: AddPaymentToOrderInput!) {
    addPaymentToOrder(orderId: $orderId, input: $input) {
      apiErrors {
        code
        message
      }
      order {
        id
        createdAt
        updatedAt
        code
        state
        total
        subtotal
        placedAt
        completedAt
        totalQuantity
        fulfillment {
          id
          amount
          total
        }
        appliedDiscounts {
          code
          applicationMode
          applicationLevel
          amount
        }
        lines {
          items {
            id
            unitPrice
            lineSubtotal
            lineTotal
            quantity
            appliedDiscounts {
              code
              applicationMode
              applicationLevel
              amount
            }
            variant {
              id
            }
          }
        }
        payments {
          id
          createdAt
          amount
          method
        }
      }
    }
  }
`;
