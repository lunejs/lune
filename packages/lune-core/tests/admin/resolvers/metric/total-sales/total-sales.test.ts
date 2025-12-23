import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('totalSales - Query', () => {
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

  test('returns total sales grouped by day', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: TOTAL_SALES_QUERY,
        variables: {
          input: {
            startsAt: OrderConstants.StartsAt,
            endsAt: OrderConstants.EndsAt
          }
        }
      });

    const { totalSales } = res.body.data;

    expect(totalSales.metrics).toHaveLength(3);
    expect(totalSales.metrics[0]).toEqual({ key: '2024-12-15', value: OrderConstants.Dec15Total });
    expect(totalSales.metrics[1]).toEqual({ key: '2024-12-16', value: OrderConstants.Dec16Total });
    expect(totalSales.metrics[2]).toEqual({ key: '2024-12-17', value: OrderConstants.Dec17Total });
    expect(totalSales.total).toBe(OrderConstants.GrandTotal);
  });

  test('returns zero for days with no orders', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: TOTAL_SALES_QUERY,
        variables: {
          input: {
            startsAt: '2024-12-10',
            endsAt: '2024-12-12'
          }
        }
      });

    const { totalSales } = res.body.data;

    expect(totalSales.metrics).toHaveLength(3);
    expect(totalSales.metrics.every(m => m.value === 0)).toBe(true);
    expect(totalSales.total).toBe(0);
  });

  test('excludes MODIFYING and CANCELED orders from totals', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: TOTAL_SALES_QUERY,
        variables: {
          input: {
            startsAt: OrderConstants.StartsAt,
            endsAt: OrderConstants.EndsAt
          }
        }
      });

    const { totalSales } = res.body.data;

    // Total should not include MODIFYING (5000) or CANCELED (8000) orders
    expect(totalSales.total).toBe(OrderConstants.GrandTotal);
    expect(totalSales.total).not.toBe(
      OrderConstants.GrandTotal +
        OrderConstants.ModifyingOrderTotal +
        OrderConstants.CanceledOrderTotal
    );
  });

  test('returns single day when startsAt equals endsAt', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: TOTAL_SALES_QUERY,
        variables: {
          input: {
            startsAt: '2024-12-15',
            endsAt: '2024-12-15'
          }
        }
      });

    const { totalSales } = res.body.data;

    expect(totalSales.metrics).toHaveLength(1);
    expect(totalSales.metrics[0]).toEqual({ key: '2024-12-15', value: OrderConstants.Dec15Total });
    expect(totalSales.total).toBe(OrderConstants.Dec15Total);
  });

  test('returns Authorization error when no token is provided', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: TOTAL_SALES_QUERY,
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

const TOTAL_SALES_QUERY = /* GraphQL */ `
  query TotalSales($input: MetricInput!) {
    totalSales(input: $input) {
      metrics {
        key
        value
      }
      total
    }
  }
`;
