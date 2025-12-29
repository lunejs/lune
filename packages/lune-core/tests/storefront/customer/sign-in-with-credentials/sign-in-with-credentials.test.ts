import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomerConstants, CustomerFixtures } from './fixtures/customer.fixtures';
import { CustomerAuthMethodFixtures } from './fixtures/customer-auth-method.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';

describe('signInCustomerWithCredentials - Mutation', () => {
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

  test('returns access token when credentials are valid', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: SIGN_IN_MUTATION,
        variables: {
          email: CustomerConstants.EnabledEmail,
          password: CustomerConstants.EnabledPassword
        }
      });

    const {
      signInCustomerWithCredentials: { accessToken, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(accessToken).toMatch(TestUtils.Regex.JWT);
  });

  test('returns INVALID_CREDENTIALS when email does not exist', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: SIGN_IN_MUTATION,
        variables: {
          email: 'nonexistent@customer.com',
          password: 'anyPassword123'
        }
      });

    const {
      signInCustomerWithCredentials: { accessToken, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(accessToken).toBeNull();
    expect(error.code).toBe('INVALID_CREDENTIALS');
  });

  test('returns INVALID_CREDENTIALS when password is incorrect', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: SIGN_IN_MUTATION,
        variables: {
          email: CustomerConstants.EnabledEmail,
          password: 'wrongPassword123'
        }
      });

    const {
      signInCustomerWithCredentials: { accessToken, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(accessToken).toBeNull();
    expect(error.code).toBe('INVALID_CREDENTIALS');
  });

  test('returns INVALID_CREDENTIALS when customer has no credentials auth method (guest)', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: SIGN_IN_MUTATION,
        variables: {
          email: CustomerConstants.GuestEmail,
          password: 'anyPassword123'
        }
      });

    const {
      signInCustomerWithCredentials: { accessToken, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(accessToken).toBeNull();
    expect(error.code).toBe('INVALID_CREDENTIALS');
  });

  test('returns INVALID_CREDENTIALS when customer is disabled', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: SIGN_IN_MUTATION,
        variables: {
          email: CustomerConstants.DisabledEmail,
          password: CustomerConstants.DisabledPassword
        }
      });

    const {
      signInCustomerWithCredentials: { accessToken, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(accessToken).toBeNull();
    expect(error.code).toBe('INVALID_CREDENTIALS');
  });

  test('returns UNAUTHORIZED error when storefront api key is invalid', async () => {
    const response = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', 'invalid_key')
      .send({
        query: SIGN_IN_MUTATION,
        variables: {
          email: 'test@example.com',
          password: 'password123'
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });

  test('returns UNAUTHORIZED error when no shop id is provided', async () => {
    const response = await request(app)
      .post('/storefront-api')
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: SIGN_IN_MUTATION,
        variables: {
          email: 'test@example.com',
          password: 'password123'
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const SIGN_IN_MUTATION = /* GraphQL */ `
  mutation SignInWithCredentials($email: String!, $password: String!) {
    signInCustomerWithCredentials(email: $email, password: $password) {
      accessToken
      apiErrors {
        code
        message
      }
    }
  }
`;
