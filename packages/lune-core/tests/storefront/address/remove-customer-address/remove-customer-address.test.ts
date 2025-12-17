import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { AddressConstants, AddressFixtures } from './fixtures/address.fixtures';
import { CountryFixtures } from './fixtures/country.fixtures';
import { CustomerConstants, CustomerFixtures } from './fixtures/customer.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { StateFixtures } from './fixtures/state.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';

describe('removeCustomerAddress - Mutation', () => {
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

  test('removes address successfully', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('Authorization', `Bearer ${CustomerConstants.AuthenticatedAccessToken}`)
      .send({
        query: REMOVE_CUSTOMER_ADDRESS_MUTATION,
        variables: {
          id: AddressConstants.AddressToRemoveID
        }
      });

    expect(res.body.data.removeCustomerAddress).toBe(true);

    // Verify address was deleted from database
    const db = testHelper.getQueryBuilder();
    const deletedAddress = await db('address')
      .where({ id: AddressConstants.AddressToRemoveID })
      .first();

    expect(deletedAddress).toBeUndefined();
  });

  test('returns UNAUTHORIZED error when no token is provided', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: REMOVE_CUSTOMER_ADDRESS_MUTATION,
        variables: {
          id: AddressConstants.AddressToRemoveID
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
        query: REMOVE_CUSTOMER_ADDRESS_MUTATION,
        variables: {
          id: AddressConstants.AddressToRemoveID
        }
      });

    expect(res.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const REMOVE_CUSTOMER_ADDRESS_MUTATION = /* GraphQL */ `
  mutation RemoveCustomerAddress($id: ID!) {
    removeCustomerAddress(id: $id)
  }
`;
