import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { CountryFixtures } from './fixtures/country.fixtures';
import { InStorePickupFixtures } from './fixtures/in-store-pickup.fixtures';
import { LocationFixtures } from './fixtures/location.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { StateFixtures } from './fixtures/state.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('locations - Query', () => {
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

  test('returns all locations', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: LOCATIONS_QUERY
      });

    const { locations } = res.body.data;

    expect(locations.count).toBe(6);
    expect(locations.items).toHaveLength(6);
  });

  test('returns locations with pagination', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: LOCATIONS_QUERY,
        variables: {
          input: {
            skip: 3,
            take: 3
          }
        }
      });

    const { locations } = res.body.data;

    expect(locations.pageInfo.total).toBe(6);
    expect(locations.count).toBe(3);
    expect(locations.items).toHaveLength(3);
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app).post('/admin-api').send({
      query: LOCATIONS_QUERY
    });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const LOCATIONS_QUERY = /* GraphQL */ `
  query Locations($input: ListInput) {
    locations(input: $input) {
      count
      pageInfo {
        total
      }
      items {
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
