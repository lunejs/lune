import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomerConstants, CustomerFixtures } from './fixtures/customer.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('customer - Query', () => {
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
