import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomerConstants, CustomerFixtures } from './fixtures/customer.fixtures';
import { CustomerAuthMethodFixtures } from './fixtures/customer-auth-method.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';

describe('updateCustomer - Mutation', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new CustomerFixtures(),
      new CustomerAuthMethodFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('updates customer profile fields', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('Authorization', `Bearer ${CustomerConstants.AuthenticatedAccessToken}`)
      .send({
        query: UPDATE_CUSTOMER_MUTATION,
        variables: {
          input: {
            firstName: 'Updated',
            lastName: 'Name',
            phoneNumber: '+1234567890'
          }
        }
      });

    const {
      updateCustomer: { customer, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(customer.firstName).toBe('Updated');
    expect(customer.lastName).toBe('Name');
    expect(customer.phoneNumber).toBe('+1234567890');
  });

  test('updates customer email', async () => {
    const newEmail = 'newemail@customer.com';

    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('Authorization', `Bearer ${CustomerConstants.AuthenticatedAccessToken}`)
      .send({
        query: UPDATE_CUSTOMER_MUTATION,
        variables: {
          input: {
            email: newEmail
          }
        }
      });

    const {
      updateCustomer: { customer, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(customer.email).toBe(newEmail);
  });

  test('returns INVALID_EMAIL when email format is invalid', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('Authorization', `Bearer ${CustomerConstants.AuthenticatedAccessToken}`)
      .send({
        query: UPDATE_CUSTOMER_MUTATION,
        variables: {
          input: {
            email: 'invalid-email'
          }
        }
      });

    const {
      updateCustomer: { customer, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(customer).toBeNull();
    expect(error.code).toBe('INVALID_EMAIL');
  });

  test('returns EMAIL_ALREADY_EXISTS when email belongs to another customer', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('Authorization', `Bearer ${CustomerConstants.AuthenticatedAccessToken}`)
      .send({
        query: UPDATE_CUSTOMER_MUTATION,
        variables: {
          input: {
            email: CustomerConstants.AlreadyUsedEmail
          }
        }
      });

    const {
      updateCustomer: { customer, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(customer).toBeNull();
    expect(error.code).toBe('EMAIL_ALREADY_EXISTS');
  });

  test('returns UNAUTHORIZED error when no token is provided', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: UPDATE_CUSTOMER_MUTATION,
        variables: {
          input: {
            firstName: 'Should Fail'
          }
        }
      });

    expect(res.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });

  test('throws error when access token is invalid', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('Authorization', 'Bearer invalid-token')
      .send({
        query: UPDATE_CUSTOMER_MUTATION,
        variables: {
          input: {
            firstName: 'Should Fail'
          }
        }
      });

    expect(res.body.errors).toBeDefined();
    expect(res.body.errors[0].message).toBe('Invalid access token');
  });

  test('returns UNAUTHORIZED when customer is disabled', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('Authorization', `Bearer ${CustomerConstants.DisabledAccessToken}`)
      .send({
        query: UPDATE_CUSTOMER_MUTATION,
        variables: {
          input: {
            firstName: 'Should Fail'
          }
        }
      });

    expect(res.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });

  test('returns UNAUTHORIZED error when storefront api key is invalid', async () => {
    const response = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', 'invalid_key')
      .send({
        query: UPDATE_CUSTOMER_MUTATION,
        variables: {
          input: {
            firstName: 'Test'
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });

  test('returns UNAUTHORIZED error when no shop id is provided', async () => {
    const response = await request(app)
      .post('/storefront-api')
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: UPDATE_CUSTOMER_MUTATION,
        variables: {
          input: {
            firstName: 'Test'
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const UPDATE_CUSTOMER_MUTATION = /* GraphQL */ `
  mutation UpdateCustomer($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      customer {
        id
        email
        firstName
        lastName
        phoneNumber
      }
      apiErrors {
        code
        message
      }
    }
  }
`;
