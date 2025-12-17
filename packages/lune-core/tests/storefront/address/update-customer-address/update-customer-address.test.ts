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

describe('updateCustomerAddress - Mutation', () => {
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

  test('updates address fields successfully', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('Authorization', `Bearer ${CustomerConstants.AuthenticatedAccessToken}`)
      .send({
        query: UPDATE_CUSTOMER_ADDRESS_MUTATION,
        variables: {
          id: AddressConstants.DefaultAddressID,
          input: {
            fullName: 'Jane Doe',
            streetLine1: '789 Updated St',
            city: 'Monterrey',
            postalCode: '64000',
            phoneNumber: '+525555555555'
          }
        }
      });

    const address = res.body.data.updateCustomerAddress;

    expect(address.id).toBe(AddressConstants.DefaultAddressID);
    expect(address.fullName).toBe('Jane Doe');
    expect(address.streetLine1).toBe('789 Updated St');
    expect(address.city).toBe('Monterrey');
    expect(address.postalCode).toBe('64000');
    expect(address.phoneNumber).toBe('+525555555555');
  });

  test('updates address country and state', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('Authorization', `Bearer ${CustomerConstants.AuthenticatedAccessToken}`)
      .send({
        query: UPDATE_CUSTOMER_ADDRESS_MUTATION,
        variables: {
          id: AddressConstants.DefaultAddressID,
          input: {
            stateId: StateConstants.MxCdmxID
          }
        }
      });

    const address = res.body.data.updateCustomerAddress;

    expect(address.state.id).toBe(StateConstants.MxCdmxID);
    expect(address.country.id).toBe(CountryConstants.MxID);
  });

  test('updates optional fields streetLine2 and references', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('Authorization', `Bearer ${CustomerConstants.AuthenticatedAccessToken}`)
      .send({
        query: UPDATE_CUSTOMER_ADDRESS_MUTATION,
        variables: {
          id: AddressConstants.DefaultAddressID,
          input: {
            streetLine2: 'Floor 5',
            references: 'Ring doorbell twice'
          }
        }
      });

    const address = res.body.data.updateCustomerAddress;

    expect(address.streetLine2).toBe('Floor 5');
    expect(address.references).toBe('Ring doorbell twice');
  });

  test('can set streetLine2 and references to null', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('Authorization', `Bearer ${CustomerConstants.AuthenticatedAccessToken}`)
      .send({
        query: UPDATE_CUSTOMER_ADDRESS_MUTATION,
        variables: {
          id: AddressConstants.DefaultAddressID,
          input: {
            streetLine2: null,
            references: null
          }
        }
      });

    const address = res.body.data.updateCustomerAddress;

    expect(address.streetLine2).toBeNull();
    expect(address.references).toBeNull();
  });

  test('setting isDefault to true removes default from previous address', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('Authorization', `Bearer ${CustomerConstants.AuthenticatedAccessToken}`)
      .send({
        query: UPDATE_CUSTOMER_ADDRESS_MUTATION,
        variables: {
          id: AddressConstants.SecondaryAddressID,
          input: {
            isDefault: true
          }
        }
      });

    const updatedAddress = res.body.data.updateCustomerAddress;

    expect(updatedAddress.isDefault).toBe(true);

    // Verify the previous default address is no longer default
    const db = testHelper.getQueryBuilder();
    const previousDefault = await db('address')
      .where({ id: AddressConstants.DefaultAddressID })
      .first();

    expect(previousDefault.is_default).toBe(false);
  });

  test('returns UNAUTHORIZED error when no token is provided', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: UPDATE_CUSTOMER_ADDRESS_MUTATION,
        variables: {
          id: AddressConstants.DefaultAddressID,
          input: {
            fullName: 'Should Fail'
          }
        }
      });

    expect(res.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });

  test('returns error when access token is invalid', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('Authorization', 'Bearer invalid-token')
      .send({
        query: UPDATE_CUSTOMER_ADDRESS_MUTATION,
        variables: {
          id: AddressConstants.DefaultAddressID,
          input: {
            fullName: 'Should Fail'
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
        query: UPDATE_CUSTOMER_ADDRESS_MUTATION,
        variables: {
          id: AddressConstants.DefaultAddressID,
          input: {
            fullName: 'Should Fail'
          }
        }
      });

    expect(res.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const UPDATE_CUSTOMER_ADDRESS_MUTATION = /* GraphQL */ `
  mutation UpdateCustomerAddress($id: ID!, $input: UpdateAddressInput!) {
    updateCustomerAddress(id: $id, input: $input) {
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
