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

describe('createLocation - Mutation', () => {
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

  test('creates a location', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_LOCATION_QUERY,
        variables: {
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
      createLocation: { location }
    } = res.body.data;

    const { country, state, inStorePickup, ...baseLocation } = location;

    expect(baseLocation).toMatchObject({
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
    expect(inStorePickup.instructions).toBe('');
  });

  test('returns LOCATION_NAME_ALREADY_EXISTS error when provided location name already exists', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_LOCATION_QUERY,
        variables: {
          input: {
            name: LocationConstants.LocationName,
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
      createLocation: { apiErrors, location }
    } = res.body.data;

    expect(location).toBeNull();

    expect(apiErrors[0].code).toBe('LOCATION_NAME_ALREADY_EXISTS');
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: CREATE_LOCATION_QUERY,
        variables: {
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

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const CREATE_LOCATION_QUERY = /* GraphQL */ `
  mutation CreateLocation($input: CreateLocationInput!) {
    createLocation(input: $input) {
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
