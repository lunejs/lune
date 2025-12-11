import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomerConstants, CustomerFixtures } from './fixtures/customer.fixtures';
import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('orders - Query', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new CustomerFixtures(),
      new OrderFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('returns orders excluding MODIFYING and CANCELED by default', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_ORDERS_QUERY,
        variables: {}
      });

    const { orders } = res.body.data;

    expect(orders.items).toHaveLength(5);
    expect(orders.items.every(o => o.state !== 'MODIFYING' && o.state !== 'CANCELED')).toBe(true);
    expect(orders.count).toBe(5);
  });

  test('returns orders filtered by state', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_ORDERS_QUERY,
        variables: {
          input: {
            filters: {
              state: 'PLACED'
            }
          }
        }
      });

    const { orders } = res.body.data;

    expect(orders.items).toHaveLength(2);
    expect(orders.items.every(o => o.state === 'PLACED')).toBe(true);
  });

  test('returns CANCELED orders when explicitly filtered', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_ORDERS_QUERY,
        variables: {
          input: {
            filters: {
              state: 'CANCELED'
            }
          }
        }
      });

    const { orders } = res.body.data;

    expect(orders.items).toHaveLength(1);
    expect(orders.items[0].state).toBe('CANCELED');
  });

  test('returns orders filtered by code (contains)', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_ORDERS_QUERY,
        variables: {
          input: {
            filters: {
              code: { contains: '1001' }
            }
          }
        }
      });

    const { orders } = res.body.data;

    expect(orders.items).toHaveLength(1);
    expect(orders.items[0].code).toBe(OrderConstants.PlacedOrderCode);
  });

  test('returns orders filtered by code (contains case insensitive)', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_ORDERS_QUERY,
        variables: {
          input: {
            filters: {
              code: { contains: '#100' }
            }
          }
        }
      });

    const { orders } = res.body.data;

    expect(orders.items).toHaveLength(2);
    expect(orders.items.every(o => o.code.includes('#100'))).toBe(true);
  });

  test('returns orders filtered by code (equals)', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_ORDERS_QUERY,
        variables: {
          input: {
            filters: {
              code: { equals: OrderConstants.ShippedOrderCode }
            }
          }
        }
      });

    const { orders } = res.body.data;

    expect(orders.items).toHaveLength(1);
    expect(orders.items[0].code).toBe(OrderConstants.ShippedOrderCode);
  });

  test('returns orders filtered by customer firstName (contains)', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_ORDERS_QUERY,
        variables: {
          input: {
            filters: {
              customer: { contains: 'John' }
            }
          }
        }
      });

    const { orders } = res.body.data;

    // John has 3 orders (excluding MODIFYING)
    expect(orders.items).toHaveLength(3);
    expect(orders.items.every(o => o.customer.firstName === CustomerConstants.JohnFirstName)).toBe(
      true
    );
  });

  test('returns orders filtered by customer lastName (contains)', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_ORDERS_QUERY,
        variables: {
          input: {
            filters: {
              customer: { contains: 'Smith' }
            }
          }
        }
      });

    const { orders } = res.body.data;

    // Jane Smith has 2 orders (excluding CANCELED)
    expect(orders.items).toHaveLength(2);
    expect(orders.items.every(o => o.customer.lastName === CustomerConstants.JaneLastName)).toBe(
      true
    );
  });

  test('returns orders filtered by customer email (contains)', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_ORDERS_QUERY,
        variables: {
          input: {
            filters: {
              customer: { contains: 'jane.smith' }
            }
          }
        }
      });

    const { orders } = res.body.data;

    expect(orders.items).toHaveLength(2);
    expect(orders.items.every(o => o.customer.email === CustomerConstants.JaneEmail)).toBe(true);
  });

  test('returns orders filtered by customer (case insensitive)', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_ORDERS_QUERY,
        variables: {
          input: {
            filters: {
              customer: { contains: 'JOHN' }
            }
          }
        }
      });

    const { orders } = res.body.data;

    expect(orders.items).toHaveLength(3);
  });

  test('returns orders matching code OR customer (OR logic)', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_ORDERS_QUERY,
        variables: {
          input: {
            filters: {
              code: { contains: '3001' },
              customer: { contains: 'John' }
            }
          }
        }
      });

    const { orders } = res.body.data;

    // Should return John's 3 orders + Jane's shipped order (#3001)
    // John's orders: #1001 (PLACED), #2001 (PROCESSING), #4001 (COMPLETED)
    // Jane's order matching code: #3001 (SHIPPED)
    expect(orders.items).toHaveLength(4);
  });

  test('searches by same value in code and customer (unified search)', async () => {
    const search = 'John';

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_ORDERS_QUERY,
        variables: {
          input: {
            filters: {
              code: { contains: search },
              customer: { contains: search }
            }
          }
        }
      });

    const { orders } = res.body.data;

    // "John" matches customer firstName, so returns John's 3 orders
    // "John" doesn't match any code, but OR logic still returns customer matches
    expect(orders.items).toHaveLength(3);
    expect(orders.items.every(o => o.customer.firstName === 'John')).toBe(true);
  });

  test('unified search matches order code', async () => {
    const search = '1001';

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_ORDERS_QUERY,
        variables: {
          input: {
            filters: {
              code: { contains: search },
              customer: { contains: search }
            }
          }
        }
      });

    const { orders } = res.body.data;

    // "1001" matches code #1001, but not any customer field
    // OR logic returns the order with matching code
    expect(orders.items).toHaveLength(1);
    expect(orders.items[0].code).toBe('#1001');
  });

  test('unified search matches customer email', async () => {
    const search = 'jane.smith@example.com';

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_ORDERS_QUERY,
        variables: {
          input: {
            filters: {
              code: { contains: search },
              customer: { contains: search }
            }
          }
        }
      });

    const { orders } = res.body.data;

    // Matches Jane's email, returns her 2 non-canceled orders
    expect(orders.items).toHaveLength(2);
    expect(orders.items.every(o => o.customer.email === CustomerConstants.JaneEmail)).toBe(true);
  });

  test('unified search with no matches returns empty', async () => {
    const search = 'nonexistent';

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_ORDERS_QUERY,
        variables: {
          input: {
            filters: {
              code: { contains: search },
              customer: { contains: search }
            }
          }
        }
      });

    const { orders } = res.body.data;

    expect(orders.items).toHaveLength(0);
  });

  test('returns orders filtered by state and customer', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_ORDERS_QUERY,
        variables: {
          input: {
            filters: {
              state: 'PLACED',
              customer: { contains: 'John' }
            }
          }
        }
      });

    const { orders } = res.body.data;

    expect(orders.items).toHaveLength(1);
    expect(orders.items[0].state).toBe('PLACED');
    expect(orders.items[0].customer.firstName).toBe(CustomerConstants.JohnFirstName);
  });

  test('returns limited number of orders', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_ORDERS_QUERY,
        variables: {
          input: {
            take: 2
          }
        }
      });

    const { orders } = res.body.data;

    expect(orders.items).toHaveLength(2);
    expect(orders.count).toBe(2);
    expect(orders.pageInfo.total).toBe(5);
  });

  test('returns orders with offset', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_ORDERS_QUERY,
        variables: {
          input: {
            skip: 2
          }
        }
      });

    const { orders } = res.body.data;

    expect(orders.items).toHaveLength(3);
    expect(orders.count).toBe(3);
    expect(orders.pageInfo.total).toBe(5);
  });

  test('returns orders with pagination applied', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_ORDERS_QUERY,
        variables: {
          input: {
            take: 2,
            skip: 1
          }
        }
      });

    const { orders } = res.body.data;

    expect(orders.items).toHaveLength(2);
    expect(orders.count).toBe(2);
    expect(orders.pageInfo.total).toBe(5);
  });

  test('returns empty array when no orders match filters', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_ORDERS_QUERY,
        variables: {
          input: {
            filters: {
              code: { equals: '#NONEXISTENT' }
            }
          }
        }
      });

    const { orders } = res.body.data;

    expect(orders.items).toHaveLength(0);
    expect(orders.count).toBe(0);
    expect(orders.pageInfo.total).toBe(0);
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app).post('/admin-api').send({
      query: GET_ORDERS_QUERY,
      variables: {}
    });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const GET_ORDERS_QUERY = /* GraphQL */ `
  query Orders($input: OrderListInput) {
    orders(input: $input) {
      items {
        id
        code
        state
        total
        subtotal
        placedAt
        customer {
          id
          firstName
          lastName
          email
        }
      }
      count
      pageInfo {
        total
      }
    }
  }
`;
