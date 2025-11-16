import request from 'supertest';

import type { InStorePickupTable } from '@/persistence/entities/in-store-pickup';
import type { LocationTable } from '@/persistence/entities/location';
import { Tables } from '@/persistence/tables';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { CountryFixtures } from './fixtures/country.fixtures';
import { InStorePickupFixtures } from './fixtures/in-store-pickup.fixtures';
import { LocationConstants, LocationFixtures } from './fixtures/location.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { StateFixtures } from './fixtures/state.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('removeLocation - Mutation', () => {
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

  test('removes a location including its relations', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: REMOVE_LOCATION_QUERY,
        variables: {
          id: LocationConstants.ID
        }
      });

    const { removeLocation } = res.body.data;

    expect(removeLocation).toBe(true);

    const location = await testHelper
      .getQueryBuilder()<LocationTable>(Tables.Location)
      .where({ id: LocationConstants.ID })
      .first();

    const inStorePickups = await testHelper
      .getQueryBuilder()<InStorePickupTable>(Tables.InStorePickup)
      .where({ location_id: LocationConstants.ID });

    expect(location).toBeUndefined();
    expect(inStorePickups).toHaveLength(0);
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: REMOVE_LOCATION_QUERY,
        variables: {
          id: LocationConstants.ID
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const REMOVE_LOCATION_QUERY = /* GraphQL */ `
  mutation RemoveLocation($id: ID!) {
    removeLocation(id: $id)
  }
`;
