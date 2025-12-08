import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShippingMethodFixtures } from './fixtures/shipping-method.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';
import { ZoneFixtures } from './fixtures/zone.fixtures';

describe('shippingMethods - Query', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new ZoneFixtures(),
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

  test('returns all shipping methods', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: SHIPPING_METHODS_QUERY
      });

    const { shippingMethods } = res.body.data;

    expect(shippingMethods).toHaveLength(6);
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app).post('/admin-api').send({
      query: SHIPPING_METHODS_QUERY
    });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const SHIPPING_METHODS_QUERY = /* GraphQL */ `
  query ShippingMethods {
    shippingMethods {
      id
      createdAt
      updatedAt
      name
      enabled
      handler {
        code
        args
      }
    }
  }
`;
