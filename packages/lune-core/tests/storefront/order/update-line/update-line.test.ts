import request from 'supertest';

import { LunePrice } from '@lune/common';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { OptionFixtures } from './fixtures/option.fixtures';
import { OptionValueFixtures } from './fixtures/option-value.fixtures';
import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import { OrderLineConstants, OrderLineFixtures } from './fixtures/order-line.fixtures';
import { ProductFixtures } from './fixtures/product.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';
import { VariantFixtures } from './fixtures/variant.fixtures';

describe('updateOrderLine - Mutation', () => {
  const testHelper = new TestHelper();

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

  test('update quantity in line', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_ORDER_LINE_MUTATION,
        variables: {
          lineId: OrderLineConstants.ID,
          input: {
            quantity: 3
          }
        }
      });

    const {
      updateOrderLine: { order }
    } = res.body.data;

    const addedLine = order.lines.items.find(l => l.id === OrderLineConstants.ID);

    expect(order.id).toBe(OrderConstants.ID);

    expect(order.total).toBe(LunePrice.toCent(2_400));
    expect(order.subtotal).toBe(LunePrice.toCent(2_400));
    expect(order.totalQuantity).toBe(3);

    expect(order.lines.items).toHaveLength(1);

    expect(addedLine.unitPrice).toBe(LunePrice.toCent(800));
    expect(addedLine.quantity).toBe(3);
    expect(addedLine.lineSubtotal).toBe(LunePrice.toCent(2_400));
    expect(addedLine.lineTotal).toBe(LunePrice.toCent(2_400));
  });

  test('removed line setting quantity as 0', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_ORDER_LINE_MUTATION,
        variables: {
          lineId: OrderLineConstants.ID,
          input: {
            quantity: 0
          }
        }
      });

    const {
      updateOrderLine: { order }
    } = res.body.data;

    const addedLine = order.lines.items.find(l => l.id === OrderLineConstants.ID);

    expect(order.id).toBe(OrderConstants.ID);

    expect(order.total).toBe(0);
    expect(order.subtotal).toBe(0);
    expect(order.totalQuantity).toBe(0);

    expect(order.lines.items).toHaveLength(0);

    expect(addedLine).toBeUndefined();
  });

  test('returns INVALID_QUANTITY when input quantity is a negative number', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_ORDER_LINE_MUTATION,
        variables: {
          lineId: OrderLineConstants.ID,
          input: {
            quantity: -1
          }
        }
      });

    const {
      updateOrderLine: { order, apiErrors }
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
          lineId: OrderLineConstants.InPlacedOrderID,
          input: {
            quantity: 2
          }
        }
      });

    const {
      updateOrderLine: { order, apiErrors }
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
          lineId: OrderLineConstants.ID,
          input: {
            quantity: 999
          }
        }
      });

    const {
      updateOrderLine: { order, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(order).toBeNull();
    expect(error.code).toBe('NOT_ENOUGH_STOCK');
  });

  test('returns INVALID_QUANTITY when input quantity is a negative number', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_ORDER_LINE_MUTATION,
        variables: {
          lineId: OrderLineConstants.ID,
          input: {
            quantity: -1
          }
        }
      });

    const {
      updateOrderLine: { order, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(order).toBeNull();
    expect(error.code).toBe('INVALID_QUANTITY');
  });
});

const ADD_ORDER_LINE_MUTATION = /* GraphQL */ `
  mutation UpdateLine($lineId: ID!, $input: UpdateOrderLineInput!) {
    updateOrderLine(lineId: $lineId, input: $input) {
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
