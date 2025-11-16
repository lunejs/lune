import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { CountryConstants, CountryFixtures } from './fixtures/country.fixtures';
import { InStorePickupFixtures } from './fixtures/in-store-pickup.fixtures';
import { LocationConstants, LocationFixtures } from './fixtures/location.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { StateConstants, StateFixtures } from './fixtures/state.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('updateLocation - Mutation', () => {
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

  test('updates a complete location', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_LOCATION_QUERY,
        variables: {
          id: LocationConstants.ID,
          input: {
            name: 'New location',
            streetLine1: 'New location in city',
            streetLine2: 'Neighborhood 12',
            city: 'minnesota',
            postalCode: '62534',
            phoneNumber: '13125552046',
            references: '3 trees',
            countryId: CountryConstants.UsID,
            stateId: StateConstants.UsMinnesotaID
          }
        }
      });

    const {
      updateLocation: { location }
    } = res.body.data;

    const { country, state, inStorePickup, ...baseLocation } = location;

    expect(baseLocation).toMatchObject({
      id: LocationConstants.ID,
      name: 'New location',
      streetLine1: 'New location in city',
      streetLine2: 'Neighborhood 12',
      city: 'minnesota',
      postalCode: '62534',
      phoneNumber: '13125552046',
      references: '3 trees'
    });

    expect(country.id).toBe(CountryConstants.UsID);
    expect(country.code).toBe(CountryConstants.UsCode);
    expect(country.name).toBe('United States');

    expect(state.id).toBe(StateConstants.UsMinnesotaID);
    expect(state.code).toBe(StateConstants.UsMinnesotaCode);
    expect(state.name).toBe('Minnesota');

    expect(inStorePickup.isAvailable).toBe(false);
    expect(inStorePickup.instructions).toBe(
      'bring the receipt to the store and your identification'
    );
  });

  test('returns LOCATION_NAME_ALREADY_EXISTS error when provided location name already exists', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_LOCATION_QUERY,
        variables: {
          id: LocationConstants.LosAngelesID,
          input: {
            name: LocationConstants.LocationName
          }
        }
      });

    const {
      updateLocation: { apiErrors, location }
    } = res.body.data;

    expect(location).toBeNull();

    expect(apiErrors[0].code).toBe('LOCATION_NAME_ALREADY_EXISTS');
  });

  test('does not update location when passing null values', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_LOCATION_QUERY,
        variables: {
          id: LocationConstants.ID,
          input: {
            name: null,
            streetLine1: null,
            streetLine2: null,
            city: null,
            postalCode: null,
            phoneNumber: null,
            references: null,
            countryId: null,
            stateId: null
          }
        }
      });

    const {
      updateLocation: { location }
    } = res.body.data;

    const { country, state, inStorePickup, ...baseLocation } = location;

    expect(baseLocation).toMatchObject({
      id: LocationConstants.ID,
      streetLine1: '1st street',
      streetLine2: '2nd street',
      city: 'New York',
      postalCode: '07086',
      phoneNumber: '13125552046',
      references: 'Petite'
    });

    expect(country.id).toBe(CountryConstants.UsID);
    expect(country.code).toBe(CountryConstants.UsCode);
    expect(country.name).toBe('United States');

    expect(state.id).toBe(StateConstants.UsNewYorkID);
    expect(state.code).toBe(StateConstants.UsNewYorkCode);
    expect(state.name).toBe('New York');

    expect(inStorePickup.isAvailable).toBe(false);
    expect(inStorePickup.instructions).toBe(
      'bring the receipt to the store and your identification'
    );
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: UPDATE_LOCATION_QUERY,
        variables: {
          id: LocationConstants.ID,
          input: {
            name: 'New location'
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const UPDATE_LOCATION_QUERY = /* GraphQL */ `
  mutation UpdateLocation($id: ID!, $input: UpdateLocationInput!) {
    updateLocation(id: $id, input: $input) {
      apiErrors {
        code
        message
      }
      location {
        id
        createdAt
        updatedAt
        name
        streetLine1
        streetLine2
        city
        postalCode
        phoneNumber
        references
        enabled
        country {
          id
          code
          name
        }
        state {
          id
          code
          name
        }
        inStorePickup {
          isAvailable
          instructions
        }
      }
    }
  }
`;
