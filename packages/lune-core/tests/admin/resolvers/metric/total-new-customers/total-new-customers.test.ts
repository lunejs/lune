import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomerConstants, CustomerFixtures } from './fixtures/customer.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('totalNewCustomers - Query', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([new UserFixtures(), new ShopFixtures(), new CustomerFixtures()]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('returns new customer count grouped by day', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: TOTAL_NEW_CUSTOMERS_QUERY,
        variables: {
          input: {
            startsAt: CustomerConstants.StartsAt,
            endsAt: CustomerConstants.EndsAt
          }
        }
      });

    const { totalNewCustomers } = res.body.data;

    expect(totalNewCustomers.metrics).toHaveLength(3);
    expect(totalNewCustomers.metrics[0]).toEqual({
      key: '2024-12-15',
      value: CustomerConstants.Dec15Count
    });
    expect(totalNewCustomers.metrics[1]).toEqual({
      key: '2024-12-16',
      value: CustomerConstants.Dec16Count
    });
    expect(totalNewCustomers.metrics[2]).toEqual({
      key: '2024-12-17',
      value: CustomerConstants.Dec17Count
    });
    expect(totalNewCustomers.total).toBe(CustomerConstants.GrandTotal);
  });

  test('returns zero for days with no new customers', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: TOTAL_NEW_CUSTOMERS_QUERY,
        variables: {
          input: {
            startsAt: '2024-12-10',
            endsAt: '2024-12-12'
          }
        }
      });

    const { totalNewCustomers } = res.body.data;

    expect(totalNewCustomers.metrics).toHaveLength(3);
    expect(totalNewCustomers.metrics.every(m => m.value === 0)).toBe(true);
    expect(totalNewCustomers.total).toBe(0);
  });

  test('returns single day when startsAt equals endsAt', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: TOTAL_NEW_CUSTOMERS_QUERY,
        variables: {
          input: {
            startsAt: '2024-12-15',
            endsAt: '2024-12-15'
          }
        }
      });

    const { totalNewCustomers } = res.body.data;

    expect(totalNewCustomers.metrics).toHaveLength(1);
    expect(totalNewCustomers.metrics[0]).toEqual({
      key: '2024-12-15',
      value: CustomerConstants.Dec15Count
    });
    expect(totalNewCustomers.total).toBe(CustomerConstants.Dec15Count);
  });

  test('returns Authorization error when no token is provided', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: TOTAL_NEW_CUSTOMERS_QUERY,
        variables: {
          input: {
            startsAt: CustomerConstants.StartsAt,
            endsAt: CustomerConstants.EndsAt
          }
        }
      });

    expect(res.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const TOTAL_NEW_CUSTOMERS_QUERY = /* GraphQL */ `
  query TotalNewCustomers($input: MetricInput!) {
    totalNewCustomers(input: $input) {
      metrics {
        key
        value
      }
      total
    }
  }
`;
