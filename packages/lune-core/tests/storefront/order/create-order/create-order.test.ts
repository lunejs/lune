import { LunePrice } from '@lunejs/common';
import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { ProductFixtures } from './fixtures/product.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';
import { VariantConstants, VariantFixtures } from './fixtures/variant.fixtures';

describe('createOrder - Mutation', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new ProductFixtures(),
      new VariantFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('creates an empty order when no line is provided', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: CREATE_ORDER_MUTATION,
        variables: {
          input: {}
        }
      });

    const {
      createOrder: { order, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(order).toMatchObject({
      state: 'MODIFYING',
      subtotal: 0,
      total: 0,
      totalQuantity: 0,
      lines: {
        items: []
      }
    });
  });

  test('creates an order with a line', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: CREATE_ORDER_MUTATION,
        variables: {
          input: {
            line: {
              productVariantId: VariantConstants.ID,
              quantity: 3
            }
          }
        }
      });

    const {
      createOrder: { order, apiErrors }
    } = res.body.data;

    const expectedLinePrice = LunePrice.toCent(VariantConstants.Price) * 3;

    expect(apiErrors).toHaveLength(0);
    expect(order).toMatchObject({
      state: 'MODIFYING',
      subtotal: expectedLinePrice,
      total: expectedLinePrice,
      totalQuantity: 3,
      lines: {
        items: [
          {
            unitPrice: LunePrice.toCent(VariantConstants.Price),
            quantity: 3,
            lineSubtotal: expectedLinePrice,
            lineTotal: expectedLinePrice,
            variant: {
              id: VariantConstants.ID
            }
          }
        ]
      }
    });
  });

  test('creates an empty order when quantity is 0', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: CREATE_ORDER_MUTATION,
        variables: {
          input: {
            line: {
              productVariantId: VariantConstants.ID,
              quantity: 0
            }
          }
        }
      });

    const {
      createOrder: { order, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(order).toMatchObject({
      state: 'MODIFYING',
      subtotal: 0,
      total: 0,
      totalQuantity: 0,
      lines: {
        items: []
      }
    });
  });

  test('returns NOT_ENOUGH_STOCK error when variant stock is insufficient', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: CREATE_ORDER_MUTATION,
        variables: {
          input: {
            line: {
              productVariantId: VariantConstants.LowStockID,
              quantity: 5
            }
          }
        }
      });

    const {
      createOrder: { order, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(1);
    expect(apiErrors[0].code).toBe('NOT_ENOUGH_STOCK');
    expect(order).toBeNull();
  });

  test('returns UNAUTHORIZED error when storefront api key is invalid', async () => {
    const response = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', 'invalid_key')
      .send({
        query: CREATE_ORDER_MUTATION,
        variables: {
          input: {}
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });

  test('returns UNAUTHORIZED error when no shop id is provided', async () => {
    const response = await request(app)
      .post('/storefront-api')
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: CREATE_ORDER_MUTATION,
        variables: {
          input: {}
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const CREATE_ORDER_MUTATION = /* GraphQL */ `
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      apiErrors {
        code
        message
      }
      order {
        id
        state
        subtotal
        total
        totalQuantity
        lines {
          items {
            id
            unitPrice
            quantity
            lineSubtotal
            lineTotal
            variant {
              id
            }
          }
        }
      }
    }
  }
`;
