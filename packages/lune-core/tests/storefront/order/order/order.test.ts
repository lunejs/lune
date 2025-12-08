import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';

describe('order - Query', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([new UserFixtures(), new ShopFixtures(), new OrderFixtures()]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('returns order by id', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_ORDER_QUERY,
        variables: {
          id: OrderConstants.ID
        }
      });

    const { order } = res.body.data;

    expect(order.id).toBe(OrderConstants.ID);
  });

  test('returns order by code', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_ORDER_QUERY,
        variables: {
          code: OrderConstants.Code
        }
      });

    const { order } = res.body.data;

    expect(order.code).toBe(OrderConstants.Code);
  });

  test('returns null when id does not match', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_ORDER_QUERY,
        variables: {
          id: TestUtils.generateUUID()
        }
      });

    const { order } = res.body.data;

    expect(order).toBeNull();
  });
});

const GET_ORDER_QUERY = /* GraphQL */ `
  query Order($id: ID, $code: String) {
    order(id: $id, code: $code) {
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
    }
  }
`;
