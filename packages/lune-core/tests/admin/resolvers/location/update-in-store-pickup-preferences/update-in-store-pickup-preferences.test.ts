import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { CountryFixtures } from './fixtures/country.fixtures';
import { InStorePickupConstants, InStorePickupFixtures } from './fixtures/in-store-pickup.fixtures';
import { LocationConstants, LocationFixtures } from './fixtures/location.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { StateFixtures } from './fixtures/state.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('updateInStorePickupPreferences - Mutation', () => {
  const testHelper = new TestHelper();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new CountryFixtures(),
      new StateFixtures(),
      new LocationFixtures(),
      new InStorePickupFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('updates a complete in store pickup preferences', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_IN_STORE_PICKUP_PREFERENCES_MUTATION,
        variables: {
          locationId: LocationConstants.JacksonID,
          input: {
            isAvailable: true,
            instructions: 'new instructions'
          }
        }
      });

    const { updateInStorePickupPreferences } = res.body.data;

    expect(updateInStorePickupPreferences).toMatchObject({
      id: InStorePickupConstants.JacksonID,
      isAvailable: true,
      instructions: 'new instructions'
    });
  });

  test('does not update preferences when passing null values', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_IN_STORE_PICKUP_PREFERENCES_MUTATION,
        variables: {
          locationId: LocationConstants.JacksonID,
          input: {
            isAvailable: null,
            instructions: null
          }
        }
      });

    const { updateInStorePickupPreferences } = res.body.data;

    expect(updateInStorePickupPreferences).toMatchObject({
      id: InStorePickupConstants.JacksonID,
      isAvailable: false,
      instructions: 'bring the receipt to the store and your identification'
    });
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: UPDATE_IN_STORE_PICKUP_PREFERENCES_MUTATION,
        variables: {
          locationId: LocationConstants.ID,
          input: {
            isAvailable: true
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const UPDATE_IN_STORE_PICKUP_PREFERENCES_MUTATION = /* GraphQL */ `
  mutation UpdateInStorePickupPreferences(
    $locationId: ID!
    $input: UpdateInStorePickupPreferencesInput!
  ) {
    updateInStorePickupPreferences(locationId: $locationId, input: $input) {
      id
      createdAt
      updatedAt
      isAvailable
      instructions
    }
  }
`;
