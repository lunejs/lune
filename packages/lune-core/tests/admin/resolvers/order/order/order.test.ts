import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('order - Query', () => {
  const testHelper = new TestHelper();

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
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
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
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
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
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_ORDER_QUERY,
        variables: {
          id: TestHelper.generateUUID()
        }
      });

    const { order } = res.body.data;

    expect(order).toBeNull();
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: GET_ORDER_QUERY,
        variables: {
          id: TestHelper.generateUUID()
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
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
