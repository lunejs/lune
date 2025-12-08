import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShippingMethodFixtures } from './fixtures/shipping-method.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';
import { ZoneConstants, ZoneFixtures } from './fixtures/zone.fixtures';

describe('createShippingMethod - Mutation', () => {
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

  test('creates a shipping method', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_SHIPPING_METHOD_MUTATION,
        variables: {
          input: {
            name: 'Express Shipping',
            zoneId: ZoneConstants.LocalID,
            handler: {
              code: 'flat-shipping-handler',
              args: {
                rate: '150'
              }
            }
          }
        }
      });

    const {
      createShippingMethod: { shippingMethod }
    } = res.body.data;

    expect(shippingMethod.name).toBe('Express Shipping');
    expect(shippingMethod.enabled).toBe(true);
    expect(shippingMethod.handler.code).toBe('flat-shipping-handler');
    expect(shippingMethod.handler.args.rate).toBe('150');
  });

  test('returns HANDLER_NOT_FOUND error when handler code is not found in config', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_SHIPPING_METHOD_MUTATION,
        variables: {
          input: {
            name: 'non existing handler',
            zoneId: ZoneConstants.LocalID,
            handler: {
              code: 'non-existing-handler-code',
              args: {
                foo: 'bar'
              }
            }
          }
        }
      });

    const {
      createShippingMethod: { shippingMethod, apiErrors }
    } = res.body.data;

    expect(shippingMethod).toBeNull();
    expect(apiErrors[0].code).toBe('HANDLER_NOT_FOUND');
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: CREATE_SHIPPING_METHOD_MUTATION,
        variables: {
          input: {
            name: 'Test method',
            zoneId: ZoneConstants.LocalID,
            handler: {
              code: 'flat-rate',
              args: {
                rate: '100'
              }
            }
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const CREATE_SHIPPING_METHOD_MUTATION = /* GraphQL */ `
  mutation CreateShippingMethod($input: CreateShippingMethodInput!) {
    createShippingMethod(input: $input) {
      apiErrors {
        code
        message
      }
      shippingMethod {
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
  }
`;
