import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { CountryFixtures } from './fixtures/country.fixtures';
import { ShippingMethodFixtures } from './fixtures/shipping-method.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { StateConstants, StateFixtures } from './fixtures/state.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';
import { ZoneFixtures } from './fixtures/zone.fixtures';
import { ZoneStateFixtures } from './fixtures/zone-state.fixtures';

describe('createZone - Mutation', () => {
  const testHelper = new TestHelper();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new CountryFixtures(),
      new StateFixtures(),
      new ZoneFixtures(),
      new ZoneStateFixtures(),
      new ShippingMethodFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('creates a basic zone', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_ZONE_MUTATION,
        variables: {
          input: {
            name: 'Europe Zone',
            stateIds: []
          }
        }
      });

    const { createZone } = res.body.data;

    expect(createZone.name).toBe('Europe Zone');
    expect(createZone.states).toHaveLength(0);
  });

  test('creates a zone with states', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_ZONE_MUTATION,
        variables: {
          input: {
            name: 'Pacific Zone',
            stateIds: [
              StateConstants.UsCaliforniaID,
              StateConstants.UsOregonID,
              StateConstants.UsWashingtonID
            ]
          }
        }
      });

    const { createZone } = res.body.data;

    expect(createZone.name).toBe('Pacific Zone');
    expect(createZone.states).toHaveLength(3);

    expect(createZone.states.find(s => s.id === StateConstants.UsCaliforniaID)).toBeDefined();
    expect(createZone.states.find(s => s.id === StateConstants.UsOregonID)).toBeDefined();
    expect(createZone.states.find(s => s.id === StateConstants.UsWashingtonID)).toBeDefined();
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: CREATE_ZONE_MUTATION,
        variables: {
          input: {
            name: 'Test Zone',
            stateIds: []
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const CREATE_ZONE_MUTATION = /* GraphQL */ `
  mutation CreateZone($input: CreateZoneInput!) {
    createZone(input: $input) {
      id
      createdAt
      updatedAt
      name
      states {
        id
        name
        code
      }
      shippingMethods {
        id
        name
        enabled
      }
    }
  }
`;
