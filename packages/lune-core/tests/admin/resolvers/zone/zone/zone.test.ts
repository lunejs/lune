import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';
import { ZoneConstants, ZoneFixtures } from './fixtures/zone.fixtures';

describe('zone - Query', () => {
  const testHelper = new TestHelper();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([new UserFixtures(), new ShopFixtures(), new ZoneFixtures()]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('returns zone by id', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ZONE_QUERY,
        variables: {
          id: ZoneConstants.LocalID
        }
      });

    const { zone } = res.body.data;

    expect(zone.id).toBe(ZoneConstants.LocalID);
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: ZONE_QUERY,
        variables: {
          id: ZoneConstants.LocalID
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const ZONE_QUERY = /* GraphQL */ `
  query Zone($id: ID!) {
    zone(id: $id) {
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
