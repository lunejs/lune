import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('totalOrders - Query', () => {
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

  test('returns order count grouped by day', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: TOTAL_ORDERS_QUERY,
        variables: {
          input: {
            startsAt: OrderConstants.StartsAt,
            endsAt: OrderConstants.EndsAt
          }
        }
      });

    const { totalOrders } = res.body.data;

    expect(totalOrders.metrics).toHaveLength(3);
    expect(totalOrders.metrics[0]).toEqual({ key: '2024-12-15', value: OrderConstants.Dec15Count });
    expect(totalOrders.metrics[1]).toEqual({ key: '2024-12-16', value: OrderConstants.Dec16Count });
    expect(totalOrders.metrics[2]).toEqual({ key: '2024-12-17', value: OrderConstants.Dec17Count });
    expect(totalOrders.total).toBe(OrderConstants.GrandTotal);
  });

  test('returns zero for days with no orders', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: TOTAL_ORDERS_QUERY,
        variables: {
          input: {
            startsAt: '2024-12-10',
            endsAt: '2024-12-12'
          }
        }
      });

    const { totalOrders } = res.body.data;

    expect(totalOrders.metrics).toHaveLength(3);
    expect(totalOrders.metrics.every(m => m.value === 0)).toBe(true);
    expect(totalOrders.total).toBe(0);
  });

  test('excludes MODIFYING and CANCELED orders from count', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: TOTAL_ORDERS_QUERY,
        variables: {
          input: {
            startsAt: OrderConstants.StartsAt,
            endsAt: OrderConstants.EndsAt
          }
        }
      });

    const { totalOrders } = res.body.data;

    // Should be 4, not 6 (excludes 1 MODIFYING + 1 CANCELED)
    expect(totalOrders.total).toBe(OrderConstants.GrandTotal);
  });

  test('returns single day when startsAt equals endsAt', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: TOTAL_ORDERS_QUERY,
        variables: {
          input: {
            startsAt: '2024-12-15',
            endsAt: '2024-12-15'
          }
        }
      });

    const { totalOrders } = res.body.data;

    expect(totalOrders.metrics).toHaveLength(1);
    expect(totalOrders.metrics[0]).toEqual({ key: '2024-12-15', value: OrderConstants.Dec15Count });
    expect(totalOrders.total).toBe(OrderConstants.Dec15Count);
  });

  test('returns Authorization error when no token is provided', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: TOTAL_ORDERS_QUERY,
        variables: {
          input: {
            startsAt: OrderConstants.StartsAt,
            endsAt: OrderConstants.EndsAt
          }
        }
      });

    expect(res.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const TOTAL_ORDERS_QUERY = /* GraphQL */ `
  query TotalOrders($input: MetricInput!) {
    totalOrders(input: $input) {
      metrics {
        key
        value
      }
      total
    }
  }
`;
