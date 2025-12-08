import request from 'supertest';

import { LunePrice } from '@lune/common';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { OptionFixtures } from './fixtures/option.fixtures';
import { OptionValueFixtures } from './fixtures/option-value.fixtures';
import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import { OrderLineFixtures } from './fixtures/order-line.fixtures';
import { ProductFixtures } from './fixtures/product.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';
import { VariantConstants, VariantFixtures } from './fixtures/variant.fixtures';

describe('addLineToOrder - Mutation', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new ProductFixtures(),
      new VariantFixtures(),
      new OptionFixtures(),
      new OptionValueFixtures(),
      new OrderFixtures(),
      new OrderLineFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('add line to an order', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_ORDER_LINE_MUTATION,
        variables: {
          orderId: OrderConstants.ID,
          input: {
            productVariantId: VariantConstants.ID,
            quantity: 2
          }
        }
      });

    const {
      addLineToOrder: { order }
    } = res.body.data;

    const addedLine = order.lines.items.find(l => l.variant.id === VariantConstants.ID);

    expect(order.total).toBe(LunePrice.toCent(3_400));
    expect(order.subtotal).toBe(LunePrice.toCent(3_400));
    expect(order.totalQuantity).toBe(3);

    expect(order.lines.items).toHaveLength(2);

    expect(addedLine.unitPrice).toBe(LunePrice.toCent(1_300));
    expect(addedLine.quantity).toBe(2);
    expect(addedLine.lineSubtotal).toBe(LunePrice.toCent(2_600));
    expect(addedLine.lineTotal).toBe(LunePrice.toCent(2_600));
  });

  test('add line to an order with already added variant', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_ORDER_LINE_MUTATION,
        variables: {
          orderId: OrderConstants.ID,
          input: {
            productVariantId: VariantConstants.AlreadyInLineID,
            quantity: 1
          }
        }
      });

    const {
      addLineToOrder: { order }
    } = res.body.data;

    const addedLine = order.lines.items.find(
      l => l.variant.id === VariantConstants.AlreadyInLineID
    );

    expect(order.id).toBe(OrderConstants.ID);

    expect(order.total).toBe(LunePrice.toCent(1_600));
    expect(order.total).toBe(LunePrice.toCent(1_600));
    expect(order.totalQuantity).toBe(2);

    expect(order.lines.items).toHaveLength(1);

    expect(addedLine.unitPrice).toBe(LunePrice.toCent(800));
    expect(addedLine.quantity).toBe(2);
    expect(addedLine.lineSubtotal).toBe(LunePrice.toCent(1_600));
    expect(addedLine.lineTotal).toBe(LunePrice.toCent(1_600));
  });

  test('returns INVALID_QUERY when input quantity is a negative number', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_ORDER_LINE_MUTATION,
        variables: {
          orderId: OrderConstants.ID,
          input: {
            productVariantId: VariantConstants.ID,
            quantity: -1
          }
        }
      });

    const {
      addLineToOrder: { order, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(order).toBeNull();
    expect(error.code).toBe('INVALID_QUANTITY');
  });

  test('returns FORBIDDEN_ORDER_ACTION when order states is not MODIFYING', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_ORDER_LINE_MUTATION,
        variables: {
          orderId: OrderConstants.OrderPlacedID,
          input: {
            productVariantId: VariantConstants.ID,
            quantity: 2
          }
        }
      });

    const {
      addLineToOrder: { order, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(order).toBeNull();
    expect(error.code).toBe('FORBIDDEN_ORDER_ACTION');
  });

  test('returns NOT_ENOUGH_STOCK when input quantity exceeds variant stock', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_ORDER_LINE_MUTATION,
        variables: {
          orderId: OrderConstants.ID,
          input: {
            productVariantId: VariantConstants.ID,
            quantity: 999
          }
        }
      });

    const {
      addLineToOrder: { order, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(order).toBeNull();
    expect(error.code).toBe('NOT_ENOUGH_STOCK');
  });

  test('returns NOT_ENOUGH_STOCK when input quantity exceeds already added variant stock', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_ORDER_LINE_MUTATION,
        variables: {
          orderId: OrderConstants.ID,
          input: {
            productVariantId: VariantConstants.AlreadyInLineID,
            quantity: 999
          }
        }
      });

    const {
      addLineToOrder: { order, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(order).toBeNull();
    expect(error.code).toBe('NOT_ENOUGH_STOCK');
  });
});

const ADD_ORDER_LINE_MUTATION = /* GraphQL */ `
  mutation AddLine($orderId: ID!, $input: CreateOrderLineInput!) {
    addLineToOrder(orderId: $orderId, input: $input) {
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
        shippingAddress {
          streetLine1
        }
        lines {
          items {
            id
            unitPrice
            lineSubtotal
            lineTotal
            quantity
            variant {
              id
            }
          }
        }
      }
    }
  }
`;
