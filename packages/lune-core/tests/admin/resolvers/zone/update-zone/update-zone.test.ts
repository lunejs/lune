import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { CountryFixtures } from './fixtures/country.fixtures';
import { ShippingMethodFixtures } from './fixtures/shipping-method.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { StateConstants, StateFixtures } from './fixtures/state.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';
import { ZoneConstants, ZoneFixtures } from './fixtures/zone.fixtures';
import { ZoneStateFixtures } from './fixtures/zone-state.fixtures';

describe('updateZone - Mutation', () => {
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

  test('updates zone name', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_ZONE_MUTATION,
        variables: {
          id: ZoneConstants.LocalID,
          input: {
            name: 'Updated Local Zone'
          }
        }
      });

    const { updateZone } = res.body.data;

    expect(updateZone.id).toBe(ZoneConstants.LocalID);
    expect(updateZone.name).toBe('Updated Local Zone');
    expect(updateZone.states).toHaveLength(2);
  });

  test('updates zone states by adding new states', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_ZONE_MUTATION,
        variables: {
          id: ZoneConstants.LocalID,
          input: {
            stateIds: [
              StateConstants.MxSinaloaID,
              StateConstants.MxJaliscoID,
              StateConstants.MxAguascalientesID
            ]
          }
        }
      });

    const { updateZone } = res.body.data;

    expect(updateZone.states).toHaveLength(3);
    expect(updateZone.states.find(s => s.id === StateConstants.MxSinaloaID)).toBeDefined();
    expect(updateZone.states.find(s => s.id === StateConstants.MxJaliscoID)).toBeDefined();
    expect(updateZone.states.find(s => s.id === StateConstants.MxAguascalientesID)).toBeDefined();
  });

  test('updates zone states by removing states', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_ZONE_MUTATION,
        variables: {
          id: ZoneConstants.LocalID,
          input: {
            stateIds: [StateConstants.MxJaliscoID]
          }
        }
      });

    const { updateZone } = res.body.data;

    expect(updateZone.states).toHaveLength(1);
    expect(updateZone.states[0].id).toBe(StateConstants.MxJaliscoID);
  });

  test('updates zone by clearing all states', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_ZONE_MUTATION,
        variables: {
          id: ZoneConstants.LocalID,
          input: {
            stateIds: []
          }
        }
      });

    const { updateZone } = res.body.data;

    expect(updateZone.states).toHaveLength(0);
  });

  test('updates zone name and states together', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_ZONE_MUTATION,
        variables: {
          id: ZoneConstants.InternationalID,
          input: {
            name: 'USA Zone',
            stateIds: [
              StateConstants.UsCaliforniaID,
              StateConstants.UsTexasID,
              StateConstants.UsFloridaID
            ]
          }
        }
      });

    const { updateZone } = res.body.data;

    expect(updateZone.name).toBe('USA Zone');
    expect(updateZone.states).toHaveLength(3);
    expect(updateZone.states.find(s => s.id === StateConstants.UsCaliforniaID)).toBeDefined();
    expect(updateZone.states.find(s => s.id === StateConstants.UsTexasID)).toBeDefined();
    expect(updateZone.states.find(s => s.id === StateConstants.UsFloridaID)).toBeDefined();
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: UPDATE_ZONE_MUTATION,
        variables: {
          id: ZoneConstants.LocalID,
          input: {
            name: 'Test Zone'
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const UPDATE_ZONE_MUTATION = /* GraphQL */ `
  mutation UpdateZone($id: ID!, $input: UpdateZoneInput!) {
    updateZone(id: $id, input: $input) {
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
