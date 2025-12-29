import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { AddressConstants, AddressFixtures } from './fixtures/address.fixtures';
import { CountryConstants, CountryFixtures } from './fixtures/country.fixtures';
import { CustomerConstants, CustomerFixtures } from './fixtures/customer.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { StateConstants, StateFixtures } from './fixtures/state.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';

describe('createCustomerAddress - Mutation', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new CountryFixtures(),
      new StateFixtures(),
      new CustomerFixtures(),
      new AddressFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('creates a customer address successfully', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('Authorization', `Bearer ${CustomerConstants.AuthenticatedAccessToken}`)
      .send({
        query: CREATE_CUSTOMER_ADDRESS_MUTATION,
        variables: {
          input: {
            fullName: 'John Doe',
            streetLine1: '123 Main St',
            city: 'Guadalajara',
            postalCode: '44100',
            phoneNumber: '+521234567890',
            countryId: CountryConstants.MxID,
            stateId: StateConstants.MxJaliscoID
          }
        }
      });

    const address = res.body.data.createCustomerAddress;

    expect(address.id).toBeDefined();
    expect(address.fullName).toBe('John Doe');
    expect(address.streetLine1).toBe('123 Main St');
    expect(address.city).toBe('Guadalajara');
    expect(address.postalCode).toBe('44100');
    expect(address.phoneNumber).toBe('+521234567890');
    expect(address.country.id).toBe(CountryConstants.MxID);
    expect(address.state.id).toBe(StateConstants.MxJaliscoID);
  });

  test('first address is automatically set as default', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('Authorization', `Bearer ${CustomerConstants.AuthenticatedAccessToken}`)
      .send({
        query: CREATE_CUSTOMER_ADDRESS_MUTATION,
        variables: {
          input: {
            fullName: 'John Doe',
            streetLine1: '123 Main St',
            city: 'Guadalajara',
            postalCode: '44100',
            phoneNumber: '+521234567890',
            countryId: CountryConstants.MxID,
            stateId: StateConstants.MxJaliscoID
          }
        }
      });

    const address = res.body.data.createCustomerAddress;

    expect(address.isDefault).toBe(true);
  });

  test('new address with isDefault removes default from existing address', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('Authorization', `Bearer ${CustomerConstants.WithExistingAddressAccessToken}`)
      .send({
        query: CREATE_CUSTOMER_ADDRESS_MUTATION,
        variables: {
          input: {
            fullName: 'New Address',
            streetLine1: '456 New St',
            city: 'Mexico City',
            postalCode: '06600',
            phoneNumber: '+529876543210',
            countryId: CountryConstants.MxID,
            stateId: StateConstants.MxJaliscoID,
            isDefault: true
          }
        }
      });

    const newAddress = res.body.data.createCustomerAddress;

    expect(newAddress.isDefault).toBe(true);

    // Verify the old address is no longer default by querying the database
    const db = testHelper.getQueryBuilder();
    const oldAddress = await db('address')
      .where({ id: AddressConstants.ExistingAddressID })
      .first();

    expect(oldAddress.is_default).toBe(false);
  });

  test('creates address with optional fields', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('Authorization', `Bearer ${CustomerConstants.AuthenticatedAccessToken}`)
      .send({
        query: CREATE_CUSTOMER_ADDRESS_MUTATION,
        variables: {
          input: {
            fullName: 'John Doe',
            streetLine1: '123 Main St',
            streetLine2: 'Apt 4B',
            city: 'Guadalajara',
            postalCode: '44100',
            phoneNumber: '+521234567890',
            references: 'Next to the park',
            countryId: CountryConstants.MxID,
            stateId: StateConstants.MxJaliscoID
          }
        }
      });

    const address = res.body.data.createCustomerAddress;

    expect(address.streetLine2).toBe('Apt 4B');
    expect(address.references).toBe('Next to the park');
  });

  test('returns UNAUTHORIZED error when no token is provided', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: CREATE_CUSTOMER_ADDRESS_MUTATION,
        variables: {
          input: {
            fullName: 'Should Fail',
            streetLine1: '123 Main St',
            city: 'Guadalajara',
            postalCode: '44100',
            phoneNumber: '+521234567890',
            countryId: CountryConstants.MxID,
            stateId: StateConstants.MxJaliscoID
          }
        }
      });

    expect(res.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });

  test('returns UNAUTHORIZED when customer is disabled', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('Authorization', `Bearer ${CustomerConstants.DisabledAccessToken}`)
      .send({
        query: CREATE_CUSTOMER_ADDRESS_MUTATION,
        variables: {
          input: {
            fullName: 'Should Fail',
            streetLine1: '123 Main St',
            city: 'Guadalajara',
            postalCode: '44100',
            phoneNumber: '+521234567890',
            countryId: CountryConstants.MxID,
            stateId: StateConstants.MxJaliscoID
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
        query: CREATE_CUSTOMER_ADDRESS_MUTATION,
        variables: {
          input: {
            fullName: 'Test',
            streetLine1: '123 Main St',
            city: 'Guadalajara',
            postalCode: '44100',
            phoneNumber: '+521234567890',
            countryId: CountryConstants.MxID,
            stateId: StateConstants.MxJaliscoID
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
        query: CREATE_CUSTOMER_ADDRESS_MUTATION,
        variables: {
          input: {
            fullName: 'Test',
            streetLine1: '123 Main St',
            city: 'Guadalajara',
            postalCode: '44100',
            phoneNumber: '+521234567890',
            countryId: CountryConstants.MxID,
            stateId: StateConstants.MxJaliscoID
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const CREATE_CUSTOMER_ADDRESS_MUTATION = /* GraphQL */ `
  mutation CreateCustomerAddress($input: CreateAddressInput!) {
    createCustomerAddress(input: $input) {
      id
      fullName
      streetLine1
      streetLine2
      city
      postalCode
      phoneNumber
      isDefault
      references
      country {
        id
        name
        code
      }
      state {
        id
        name
        code
      }
    }
  }
`;
