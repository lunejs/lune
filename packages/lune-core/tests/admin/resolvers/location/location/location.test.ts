import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { CountryFixtures } from './fixtures/country.fixtures';
import { InStorePickupFixtures } from './fixtures/in-store-pickup.fixtures';
import { LocationConstants, LocationFixtures } from './fixtures/location.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { StateFixtures } from './fixtures/state.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('location - Query', () => {
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

  test('returns location by id', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: LOCATIONS_QUERY,
        variables: {
          id: LocationConstants.ID
        }
      });

    const { location } = res.body.data;

    expect(location.id).toBe(LocationConstants.ID);
  });

  test('returns null when provided id does not exists', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', TestHelper.generateUUID())
      .send({
        query: LOCATIONS_QUERY,
        variables: {
          id: LocationConstants.ID
        }
      });

    const { location } = res.body.data;

    expect(location).toBeNull();
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: LOCATIONS_QUERY,
        variables: {
          id: LocationConstants.ID
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const LOCATIONS_QUERY = /* GraphQL */ `
  query Location($id: ID!) {
    location(id: $id) {
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
`;
