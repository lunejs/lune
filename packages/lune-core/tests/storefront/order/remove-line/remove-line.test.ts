import request from 'supertest';

import { LunePrice } from '@lunejs/common';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { OptionFixtures } from './fixtures/option.fixtures';
import { OptionValueFixtures } from './fixtures/option-value.fixtures';
import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import { OrderLineConstants, OrderLineFixtures } from './fixtures/order-line.fixtures';
import { ProductFixtures } from './fixtures/product.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';
import { VariantFixtures } from './fixtures/variant.fixtures';

describe('removeOrderLine - Mutation', () => {
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

  test('remove a line', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: REMOVE_LINE_MUTATION,
        variables: {
          lineId: OrderLineConstants.ID
        }
      });

    const {
      removeOrderLine: { order }
    } = res.body.data;

    const removedLine = order.lines.items.find(l => l.id === OrderLineConstants.ID);

    expect(order.id).toBe(OrderConstants.ID);

    expect(order.total).toBe(LunePrice.toCent(2_600));
    expect(order.subtotal).toBe(LunePrice.toCent(2_600));
    expect(order.totalQuantity).toBe(2);

    expect(order.lines.items).toHaveLength(1);

    expect(removedLine).toBeUndefined();
  });

  test('returns FORBIDDEN_ORDER_ACTION when order states is not MODIFYING', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: REMOVE_LINE_MUTATION,
        variables: {
          lineId: OrderLineConstants.InPlacedOrderID
        }
      });

    const {
      removeOrderLine: { order, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(order).toBeNull();
    expect(error.code).toBe('FORBIDDEN_ORDER_ACTION');
  });

  test('returns UNAUTHORIZED error when storefront api key is invalid', async () => {
    const response = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', 'invalid_key')
      .send({
        query: REMOVE_LINE_MUTATION,
        variables: {
          lineId: OrderLineConstants.ID
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });

  test('returns UNAUTHORIZED error when no shop id is provided', async () => {
    const response = await request(app)
      .post('/storefront-api')
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: REMOVE_LINE_MUTATION,
        variables: {
          lineId: OrderLineConstants.ID
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const REMOVE_LINE_MUTATION = /* GraphQL */ `
  mutation RemoveLine($lineId: ID!) {
    removeOrderLine(lineId: $lineId) {
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
