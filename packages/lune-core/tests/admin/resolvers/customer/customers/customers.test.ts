import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomerConstants, CustomerFixtures } from './fixtures/customer.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('customers - Query', () => {
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

  test('returns all customers', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOMERS_QUERY
      });

    const { customers } = res.body.data;

    expect(customers.items).toHaveLength(3);
    expect(customers.count).toBe(3);
    expect(customers.pageInfo.total).toBe(3);
  });

  test('returns customers with pagination', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOMERS_QUERY,
        variables: {
          input: { take: 2 }
        }
      });

    const { customers } = res.body.data;

    expect(customers.items).toHaveLength(2);
    expect(customers.count).toBe(2);
    expect(customers.pageInfo.total).toBe(3);
  });

  test('returns customers filtered by email (contains)', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOMERS_QUERY,
        variables: {
          input: {
            filters: {
              email: { contains: 'john' }
            }
          }
        }
      });

    const { customers } = res.body.data;

    expect(customers.items).toHaveLength(1);
    expect(customers.items[0].email).toBe(CustomerConstants.Customer1Email);
  });

  test('returns customers filtered by email (equals)', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOMERS_QUERY,
        variables: {
          input: {
            filters: {
              email: { equals: CustomerConstants.Customer1Email }
            }
          }
        }
      });

    const { customers } = res.body.data;

    expect(customers.items).toHaveLength(1);
    expect(customers.items[0].email).toBe(CustomerConstants.Customer1Email);
  });

  test('returns empty when email equals partial match', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOMERS_QUERY,
        variables: {
          input: {
            filters: {
              email: { equals: 'john' }
            }
          }
        }
      });

    const { customers } = res.body.data;

    expect(customers.items).toHaveLength(0);
  });

  test('returns customers filtered by firstName (contains)', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOMERS_QUERY,
        variables: {
          input: {
            filters: {
              firstName: { contains: 'jan' }
            }
          }
        }
      });

    const { customers } = res.body.data;

    expect(customers.items).toHaveLength(1);
    expect(customers.items[0].firstName).toBe(CustomerConstants.Customer2FirstName);
  });

  test('returns customers filtered by firstName (equals)', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOMERS_QUERY,
        variables: {
          input: {
            filters: {
              firstName: { equals: CustomerConstants.Customer1FirstName }
            }
          }
        }
      });

    const { customers } = res.body.data;

    expect(customers.items).toHaveLength(1);
    expect(customers.items[0].firstName).toBe(CustomerConstants.Customer1FirstName);
  });

  test('returns empty when firstName equals partial match', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOMERS_QUERY,
        variables: {
          input: {
            filters: {
              firstName: { equals: 'Jo' }
            }
          }
        }
      });

    const { customers } = res.body.data;

    expect(customers.items).toHaveLength(0);
  });

  test('returns customers filtered by lastName (contains)', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOMERS_QUERY,
        variables: {
          input: {
            filters: {
              lastName: { contains: 'smi' }
            }
          }
        }
      });

    const { customers } = res.body.data;

    expect(customers.items).toHaveLength(1);
    expect(customers.items[0].lastName).toBe(CustomerConstants.Customer2LastName);
  });

  test('returns customers filtered by lastName (equals)', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOMERS_QUERY,
        variables: {
          input: {
            filters: {
              lastName: { equals: CustomerConstants.Customer1LastName }
            }
          }
        }
      });

    const { customers } = res.body.data;

    expect(customers.items).toHaveLength(1);
    expect(customers.items[0].lastName).toBe(CustomerConstants.Customer1LastName);
  });

  test('returns empty when lastName equals partial match', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOMERS_QUERY,
        variables: {
          input: {
            filters: {
              lastName: { equals: 'Do' }
            }
          }
        }
      });

    const { customers } = res.body.data;

    expect(customers.items).toHaveLength(0);
  });

  test('returns customers filtered by enabled (false)', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOMERS_QUERY,
        variables: {
          input: {
            filters: {
              enabled: { equals: false }
            }
          }
        }
      });

    const { customers } = res.body.data;

    expect(customers.items).toHaveLength(1);
    expect(customers.items[0].email).toBe(CustomerConstants.Customer3Email);
    expect(customers.items[0].enabled).toBe(false);
  });

  test('returns customers filtered by enabled (true)', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOMERS_QUERY,
        variables: {
          input: {
            filters: {
              enabled: { equals: true }
            }
          }
        }
      });

    const { customers } = res.body.data;

    expect(customers.items).toHaveLength(2);
    expect(customers.items.every(c => c.enabled === true)).toBe(true);
  });

  test('returns UNAUTHORIZED error when no token is provided', async () => {
    const res = await request(app).post('/admin-api').set('x_lune_shop_id', ShopConstants.ID).send({
      query: GET_CUSTOMERS_QUERY
    });

    expect(res.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const GET_CUSTOMERS_QUERY = /* GraphQL */ `
  query Customers($input: CustomerListInput) {
    customers(input: $input) {
      items {
        id
        email
        firstName
        lastName
        enabled
      }
      count
      pageInfo {
        total
      }
    }
  }
`;
