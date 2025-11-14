import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('shippingHandlers - Query', () => {
  const testHelper = new TestHelper();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([new UserFixtures()]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('returns all shipping handlers', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .send({
        query: SHIPPING_HANDLERS_QUERY
      });

    const { shippingHandlers } = res.body.data;

    expect(shippingHandlers).toHaveLength(1);

    expect(shippingHandlers[0].code).toBe('flat-shipping-handler');
    expect(shippingHandlers[0].args).toMatchObject({
      price: {
        type: 'price',
        label: 'Price',
        required: true,
        defaultValue: 0
      }
    });
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app).post('/admin-api').send({
      query: SHIPPING_HANDLERS_QUERY
    });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const SHIPPING_HANDLERS_QUERY = /* GraphQL */ `
  query ShippingHandlers {
    shippingHandlers {
      name
      code
      args
    }
  }
`;
