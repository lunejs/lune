import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { DiscountFixtures } from './fixtures/discount.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('discounts - Query', () => {
  const testHelper = new TestHelper();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([new UserFixtures(), new ShopFixtures(), new DiscountFixtures()]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('returns discounts matching code filter (contains)', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_DISCOUNTS_QUERY,
        variables: {
          input: {
            filters: {
              code: { contains: 'SUMMER' }
            }
          }
        }
      });

    const { discounts } = res.body.data;

    expect(discounts.items.map(d => d.code).every(code => code.includes('SUMMER'))).toBe(true);
    expect(discounts.count).toBe(discounts.pageInfo.total);
  });

  test('returns discounts matching code filter (contains case insensitive)', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_DISCOUNTS_QUERY,
        variables: {
          input: {
            filters: {
              code: { contains: 'summer' }
            }
          }
        }
      });

    const { discounts } = res.body.data;

    expect(
      discounts.items.map(d => d.code).every(code => code.toLowerCase().includes('summer'))
    ).toBe(true);
    expect(discounts.items).toHaveLength(1);
    expect(discounts.count).toBe(discounts.pageInfo.total);
  });

  test('returns discounts matching code filter (equals)', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_DISCOUNTS_QUERY,
        variables: {
          input: {
            filters: {
              code: { equals: 'SUMMER2024' }
            }
          }
        }
      });

    const { discounts } = res.body.data;

    expect(discounts.items[0].code).toBe('SUMMER2024');
    expect(discounts.items).toHaveLength(1);
    expect(discounts.count).toBe(discounts.pageInfo.total);
  });

  test('returns discounts matching enabled filter (true)', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_DISCOUNTS_QUERY,
        variables: {
          input: {
            filters: {
              enabled: { equals: true }
            }
          }
        }
      });

    const { discounts } = res.body.data;

    expect(discounts.items.every(d => d.enabled === true)).toBe(true);
    expect(discounts.items).toHaveLength(7);
    expect(discounts.count).toBe(discounts.pageInfo.total);
  });

  test('returns discounts matching enabled filter (false)', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_DISCOUNTS_QUERY,
        variables: {
          input: {
            filters: {
              enabled: { equals: false }
            }
          }
        }
      });

    const { discounts } = res.body.data;

    expect(discounts.items).toHaveLength(1);
    expect(discounts.items.every(d => d.enabled)).toBe(false);
    expect(discounts.count).toBe(discounts.pageInfo.total);
  });

  test('returns only active discounts when active filter is true', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_DISCOUNTS_QUERY,
        variables: {
          input: {
            filters: {
              active: { equals: true }
            }
          }
        }
      });

    const { discounts } = res.body.data;

    const now = new Date();

    expect(
      discounts.items.every(d => {
        const startsAt = new Date(d.startsAt);
        const endsAt = d.endsAt ? new Date(d.endsAt) : null;

        const hasStarted = startsAt <= now;
        const hasNotEnded = !endsAt || endsAt >= now;
        return hasStarted && hasNotEnded;
      })
    ).toBe(true);

    expect(discounts.count).toBe(discounts.pageInfo.total);
  });

  test('returns discounts matching code contains and enabled filters', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_DISCOUNTS_QUERY,
        variables: {
          input: {
            filters: {
              code: { contains: 'LEVEL' },
              enabled: { equals: true }
            }
          }
        }
      });

    const { discounts } = res.body.data;

    expect(discounts.items.every(d => d.code.includes('LEVEL') && d.enabled === true)).toBe(true);
    expect(discounts.items).toHaveLength(2);
    expect(discounts.count).toBe(discounts.pageInfo.total);
  });

  test('returns discounts matching code equals and active filters', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_DISCOUNTS_QUERY,
        variables: {
          input: {
            filters: {
              code: { equals: 'SUMMER2024' },
              active: { equals: true }
            }
          }
        }
      });

    const { discounts } = res.body.data;

    expect(discounts.items).toHaveLength(1);
    expect(discounts.items[0].code).toBe('SUMMER2024');
    expect(discounts.count).toBe(discounts.pageInfo.total);
  });

  test('returns discounts matching active and enabled filters', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_DISCOUNTS_QUERY,
        variables: {
          input: {
            filters: {
              active: { equals: true },
              enabled: { equals: true }
            }
          }
        }
      });

    const { discounts } = res.body.data;

    const now = new Date();

    expect(
      discounts.items.every(d => {
        const startsAt = new Date(d.startsAt);
        const endsAt = d.endsAt ? new Date(d.endsAt) : null;

        const hasStarted = startsAt <= now;
        const hasNotEnded = !endsAt || endsAt >= now;
        return hasStarted && hasNotEnded && d.enabled === true;
      })
    ).toBe(true);

    expect(discounts.count).toBe(discounts.pageInfo.total);
  });

  test('returns limited number of discounts', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_DISCOUNTS_QUERY,
        variables: {
          input: {
            take: 3
          }
        }
      });

    const { discounts } = res.body.data;

    expect(discounts.items).toHaveLength(3);
    expect(discounts.count).toBe(3);
    expect(discounts.pageInfo.total).toBe(8);
  });

  test('returns discounts with offset', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_DISCOUNTS_QUERY,
        variables: {
          input: {
            skip: 2
          }
        }
      });

    const { discounts } = res.body.data;

    expect(discounts.items).toHaveLength(6);
    expect(discounts.count).toBe(6);
    expect(discounts.pageInfo.total).toBe(8);
  });

  test('returns discounts with pagination applied', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_DISCOUNTS_QUERY,
        variables: {
          input: {
            take: 2,
            skip: 1
          }
        }
      });

    const { discounts } = res.body.data;

    expect(discounts.items).toHaveLength(2);
    expect(discounts.count).toBe(2);
    expect(discounts.pageInfo.total).toBe(8);
  });

  test('returns empty array when no discounts match filters', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_DISCOUNTS_QUERY,
        variables: {
          input: {
            filters: {
              code: { equals: 'NONEXISTENT' }
            }
          }
        }
      });

    const { discounts } = res.body.data;

    expect(discounts.items).toHaveLength(0);
    expect(discounts.count).toBe(0);
    expect(discounts.pageInfo.total).toBe(0);
  });

  test('returns all discounts when no filters provided', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_DISCOUNTS_QUERY,
        variables: {}
      });

    const { discounts } = res.body.data;

    expect(discounts.items).toHaveLength(8);
    expect(discounts.count).toBe(8);
    expect(discounts.pageInfo.total).toBe(8);
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app).post('/admin-api').send({
      query: GET_DISCOUNTS_QUERY,
      variables: {}
    });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const GET_DISCOUNTS_QUERY = /* GraphQL */ `
  query Discounts($input: DiscountListInput) {
    discounts(input: $input) {
      items {
        id
        createdAt
        updatedAt
        code
        applicationMode
        applicationLevel
        perCustomerLimit
        startsAt
        endsAt
        enabled
        handler {
          code
          args
        }
      }
      count
      pageInfo {
        total
      }
    }
  }
`;
