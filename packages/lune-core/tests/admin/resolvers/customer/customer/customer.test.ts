import request from 'supertest';

import { LunePrice } from '@lunejs/common';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomerConstants, CustomerFixtures } from './fixtures/customer.fixtures';
import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('customer - Query', () => {
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

  test('returns customer by id', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOMER_QUERY,
        variables: {
          id: CustomerConstants.ID
        }
      });

    const { customer } = res.body.data;

    expect(customer.id).toBe(CustomerConstants.ID);
    expect(customer.email).toBe(CustomerConstants.Email);
    expect(customer.firstName).toBe(CustomerConstants.FirstName);
    expect(customer.lastName).toBe(CustomerConstants.LastName);
    expect(customer.phoneNumber).toBe(CustomerConstants.PhoneNumber);
    expect(customer.enabled).toBe(true);
  });

  test('returns null when customer does not exist', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOMER_QUERY,
        variables: {
          id: TestUtils.generateUUID()
        }
      });

    const { customer } = res.body.data;

    expect(customer).toBeNull();
  });

  test('returns UNAUTHORIZED error when no token is provided', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOMER_QUERY,
        variables: {
          id: CustomerConstants.ID
        }
      });

    expect(res.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });

  test('returns customer orders', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOMER_WITH_ORDERS_QUERY,
        variables: {
          id: CustomerConstants.ID
        }
      });

    const { customer } = res.body.data;

    expect(customer.orders.items).toHaveLength(2);
    expect(customer.orders.count).toBe(2);
    expect(customer.orders.pageInfo.total).toBe(2);

    const orderCodes = customer.orders.items.map((o: { code: string }) => o.code);
    expect(orderCodes).toContain(OrderConstants.Order1Code);
    expect(orderCodes).toContain(OrderConstants.Order2Code);
  });

  test('returns customer orders with pagination', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOMER_WITH_ORDERS_QUERY,
        variables: {
          id: CustomerConstants.ID,
          ordersInput: { take: 1 }
        }
      });

    const { customer } = res.body.data;

    expect(customer.orders.items).toHaveLength(1);
    expect(customer.orders.pageInfo.total).toBe(2);
  });

  test('returns customer total spent', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOMER_WITH_ORDERS_QUERY,
        variables: {
          id: CustomerConstants.ID
        }
      });

    const { customer } = res.body.data;

    // Order 1: 10000 (Placed) + Order 2: 5000 (Completed) = 15000
    expect(customer.totalSpent).toBe(LunePrice.toCent(150));
  });
});

const GET_CUSTOMER_QUERY = /* GraphQL */ `
  query Customer($id: ID!) {
    customer(id: $id) {
      id
      email
      firstName
      lastName
      phoneNumber
      enabled
      createdAt
      updatedAt
    }
  }
`;

const GET_CUSTOMER_WITH_ORDERS_QUERY = /* GraphQL */ `
  query CustomerWithOrders($id: ID!, $ordersInput: OrderListInput) {
    customer(id: $id) {
      id
      totalSpent
      orders(input: $ordersInput) {
        items {
          id
          code
          state
          total
        }
        count
        pageInfo {
          total
        }
      }
    }
  }
`;
