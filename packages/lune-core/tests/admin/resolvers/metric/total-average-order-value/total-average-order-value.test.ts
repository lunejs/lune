import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('totalAverageOrdersValue - Query', () => {
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

  test('returns average order value grouped by day', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: TOTAL_AVERAGE_ORDER_VALUE_QUERY,
        variables: {
          input: {
            startsAt: OrderConstants.StartsAt,
            endsAt: OrderConstants.EndsAt
          }
        }
      });

    const { totalAverageOrdersValue } = res.body.data;

    expect(totalAverageOrdersValue.metrics).toHaveLength(3);
    expect(totalAverageOrdersValue.metrics[0]).toEqual({
      key: '2024-12-15',
      value: OrderConstants.Dec15Avg
    });
    expect(totalAverageOrdersValue.metrics[1]).toEqual({
      key: '2024-12-16',
      value: OrderConstants.Dec16Avg
    });
    expect(totalAverageOrdersValue.metrics[2]).toEqual({
      key: '2024-12-17',
      value: OrderConstants.Dec17Avg
    });
    expect(totalAverageOrdersValue.total).toBe(OrderConstants.GrandTotalAvg);
  });

  test('returns zero for days with no orders', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: TOTAL_AVERAGE_ORDER_VALUE_QUERY,
        variables: {
          input: {
            startsAt: '2024-12-10',
            endsAt: '2024-12-12'
          }
        }
      });

    const { totalAverageOrdersValue } = res.body.data;

    expect(totalAverageOrdersValue.metrics).toHaveLength(3);
    expect(totalAverageOrdersValue.metrics.every(m => m.value === 0)).toBe(true);
    expect(totalAverageOrdersValue.total).toBe(0);
  });

  test('excludes MODIFYING and CANCELED orders from average', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: TOTAL_AVERAGE_ORDER_VALUE_QUERY,
        variables: {
          input: {
            startsAt: OrderConstants.StartsAt,
            endsAt: OrderConstants.EndsAt
          }
        }
      });

    const { totalAverageOrdersValue } = res.body.data;

    // Dec 16 should be 30000, not affected by canceled order (88888)
    expect(totalAverageOrdersValue.metrics[1].value).toBe(OrderConstants.Dec16Avg);
  });

  test('returns single day when startsAt equals endsAt', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: TOTAL_AVERAGE_ORDER_VALUE_QUERY,
        variables: {
          input: {
            startsAt: '2024-12-15',
            endsAt: '2024-12-15'
          }
        }
      });

    const { totalAverageOrdersValue } = res.body.data;

    expect(totalAverageOrdersValue.metrics).toHaveLength(1);
    expect(totalAverageOrdersValue.metrics[0]).toEqual({
      key: '2024-12-15',
      value: OrderConstants.Dec15Avg
    });
    expect(totalAverageOrdersValue.total).toBe(OrderConstants.Dec15Avg);
  });

  test('returns Authorization error when no token is provided', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: TOTAL_AVERAGE_ORDER_VALUE_QUERY,
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

const TOTAL_AVERAGE_ORDER_VALUE_QUERY = /* GraphQL */ `
  query TotalAverageOrdersValue($input: MetricInput!) {
    totalAverageOrdersValue(input: $input) {
      metrics {
        key
        value
      }
      total
    }
  }
`;
