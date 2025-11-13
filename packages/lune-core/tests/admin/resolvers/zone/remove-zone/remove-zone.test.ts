import request from 'supertest';

import { Tables } from '@/persistence/tables';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { CountryFixtures } from './fixtures/country.fixtures';
import { ShippingMethodFixtures } from './fixtures/shipping-method.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { StateFixtures } from './fixtures/state.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';
import { ZoneConstants, ZoneFixtures } from './fixtures/zone.fixtures';
import { ZoneStateFixtures } from './fixtures/zone-state.fixtures';

describe('removeZone - Mutation', () => {
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

  test('removes a zone', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: REMOVE_ZONE_MUTATION,
        variables: {
          id: ZoneConstants.LocalID
        }
      });

    const { removeZone } = res.body.data;

    expect(removeZone).toBe(true);

    const zone = await testHelper
      .getQueryBuilder()(Tables.Zone)
      .where('id', ZoneConstants.LocalID)
      .first();

    expect(zone).toBeUndefined();
  });

  test('removes a zone with states and shipping methods', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: REMOVE_ZONE_MUTATION,
        variables: {
          id: ZoneConstants.LocalID
        }
      });

    const { removeZone } = res.body.data;

    expect(removeZone).toBe(true);

    const db = testHelper.getQueryBuilder();
    const zone = await db(Tables.Zone).where('id', ZoneConstants.LocalID).first();
    const zoneStates = await db(Tables.ZoneState).where('zone_id', ZoneConstants.LocalID);
    const shippingMethods = await db(Tables.ShippingMethod).where('zone_id', ZoneConstants.LocalID);

    expect(zone).toBeUndefined();
    expect(zoneStates).toHaveLength(0);
    expect(shippingMethods).toHaveLength(0);
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: REMOVE_ZONE_MUTATION,
        variables: {
          id: ZoneConstants.LocalID
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const REMOVE_ZONE_MUTATION = /* GraphQL */ `
  mutation RemoveZone($id: ID!) {
    removeZone(id: $id)
  }
`;
