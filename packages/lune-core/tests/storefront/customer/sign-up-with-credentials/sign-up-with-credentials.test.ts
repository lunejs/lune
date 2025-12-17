import request from 'supertest';

import { CustomerAuthProvider } from '@/persistence/entities/customer-auth-method';
import { Tables } from '@/persistence/tables';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomerConstants, CustomerFixtures } from './fixtures/customer.fixtures';
import { CustomerAuthMethodFixtures } from './fixtures/customer-auth-method.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';

describe('signUpCustomerWithCredentials - Mutation', () => {
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

  test('creates a new customer and returns access token', async () => {
    const inputEmail = 'new@customer.com';
    const inputPassword = 'securePassword123';

    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: SIGN_UP_MUTATION,
        variables: {
          input: {
            email: inputEmail,
            password: inputPassword,
            firstName: 'New',
            lastName: 'Customer',
            phoneNumber: '+1234567890'
          }
        }
      });

    const {
      signUpCustomerWithCredentials: { accessToken, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(accessToken).toMatch(TestUtils.Regex.JWT);

    // Verify customer was created in database
    const db = testHelper.getQueryBuilder();
    const customer = await db(Tables.Customer).where({ email: inputEmail }).first();

    expect(customer).toBeDefined();
    expect(customer.email).toBe(inputEmail);
    expect(customer.first_name).toBe('New');
    expect(customer.last_name).toBe('Customer');
    expect(customer.phone_number).toBe('+1234567890');
    expect(customer.enabled).toBe(true);

    // Verify auth method was created with hashed password
    const authMethod = await db(Tables.CustomerAuthMethod)
      .where({ customer_id: customer.id, provider: CustomerAuthProvider.Credentials })
      .first();

    expect(authMethod).toBeDefined();
    expect(authMethod.password).not.toBe(inputPassword);
    expect(authMethod.password).toMatch(TestUtils.Regex.HASH);
  });

  test('creates a new customer with only required fields', async () => {
    const inputEmail = 'minimal@customer.com';
    const inputPassword = 'securePassword123';

    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: SIGN_UP_MUTATION,
        variables: {
          input: {
            email: inputEmail,
            password: inputPassword
          }
        }
      });

    const {
      signUpCustomerWithCredentials: { accessToken, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(accessToken).toMatch(TestUtils.Regex.JWT);

    // Verify customer was created with null optional fields
    const db = testHelper.getQueryBuilder();
    const customer = await db(Tables.Customer).where({ email: inputEmail }).first();

    expect(customer).toBeDefined();
    expect(customer.email).toBe(inputEmail);
    expect(customer.first_name).toBeNull();
    expect(customer.last_name).toBeNull();
    expect(customer.phone_number).toBeNull();

    // Verify auth method was created
    const authMethod = await db(Tables.CustomerAuthMethod)
      .where({ customer_id: customer.id, provider: CustomerAuthProvider.Credentials })
      .first();

    expect(authMethod).toBeDefined();
    expect(authMethod).toBeDefined();
    expect(authMethod.password).not.toBe(inputPassword);
    expect(authMethod.password).toMatch(TestUtils.Regex.HASH);
  });

  test('upgrades a guest customer to a registered customer', async () => {
    const inputPassword = 'newSecurePassword123';

    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: SIGN_UP_MUTATION,
        variables: {
          input: {
            email: CustomerConstants.GuestEmail,
            password: inputPassword,
            firstName: 'Updated',
            lastName: 'Name'
          }
        }
      });

    const {
      signUpCustomerWithCredentials: { accessToken, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(accessToken).toMatch(TestUtils.Regex.JWT);

    // Verify the existing guest customer was updated (not created new)
    const db = testHelper.getQueryBuilder();
    const customer = await db(Tables.Customer)
      .where({ email: CustomerConstants.GuestEmail })
      .first();

    expect(customer).toBeDefined();
    expect(customer.id).toBe(CustomerConstants.GuestID); // Same ID, not a new customer
    expect(customer.first_name).toBe('Updated');
    expect(customer.last_name).toBe('Name');

    // Verify auth method was created for the existing guest customer
    const authMethod = await db(Tables.CustomerAuthMethod)
      .where({ customer_id: CustomerConstants.GuestID, provider: CustomerAuthProvider.Credentials })
      .first();

    expect(authMethod).toBeDefined();
    expect(authMethod.password).not.toBe(inputPassword);
    expect(authMethod.password).toMatch(TestUtils.Regex.HASH);

    // Verify only one customer exists with this email
    const customerCount = await db(Tables.Customer)
      .where({ email: CustomerConstants.GuestEmail })
      .count();
    expect(Number(customerCount[0].count)).toBe(1);
  });

  test('returns INVALID_EMAIL error when email is invalid', async () => {
    const invalidEmail = 'invalid-email';

    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: SIGN_UP_MUTATION,
        variables: {
          input: {
            email: invalidEmail,
            password: 'securePassword123'
          }
        }
      });

    const {
      signUpCustomerWithCredentials: { accessToken, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(accessToken).toBeNull();
    expect(error.code).toBe('INVALID_EMAIL');

    // Verify no customer was created with invalid email
    const db = testHelper.getQueryBuilder();
    const customer = await db(Tables.Customer).where({ email: invalidEmail }).first();
    expect(customer).toBeUndefined();
  });

  test('returns EMAIL_ALREADY_EXISTS when customer already has credentials', async () => {
    // Count auth methods before attempt
    const db = testHelper.getQueryBuilder();
    const authMethodsBefore = await db(Tables.CustomerAuthMethod)
      .where({ customer_id: CustomerConstants.RegisteredID })
      .count();

    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: SIGN_UP_MUTATION,
        variables: {
          input: {
            email: CustomerConstants.RegisteredEmail,
            password: 'anotherPassword123'
          }
        }
      });

    const {
      signUpCustomerWithCredentials: { accessToken, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(accessToken).toBeNull();
    expect(error.code).toBe('EMAIL_ALREADY_EXISTS');

    // Verify no new auth method was created
    const authMethodsAfter = await db(Tables.CustomerAuthMethod)
      .where({ customer_id: CustomerConstants.RegisteredID })
      .count();

    expect(Number(authMethodsAfter[0].count)).toBe(Number(authMethodsBefore[0].count));
  });
});

const SIGN_UP_MUTATION = /* GraphQL */ `
  mutation SignUpWithCredentials($input: SignUpWithCredentialsInput!) {
    signUpCustomerWithCredentials(input: $input) {
      accessToken
      apiErrors {
        code
        message
      }
    }
  }
`;
