import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { CountryFixtures } from './fixtures/country.fixtures';
import {
  ShippingMethodConstants,
  ShippingMethodFixtures
} from './fixtures/shipping-method.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { StateFixtures } from './fixtures/state.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';
import { ZoneFixtures } from './fixtures/zone.fixtures';
import { ZoneStateFixtures } from './fixtures/zone-state.fixtures';

describe('updateShippingMethod - Mutation', () => {
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

  test('updates general shipping method', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_SHIPPING_METHOD_MUTATION,
        variables: {
          id: ShippingMethodConstants.ExpressLocalID,
          input: {
            name: 'Updated Express Local',
            enabled: false
          }
        }
      });

    const { updateShippingMethod } = res.body.data;

    expect(updateShippingMethod.id).toBe(ShippingMethodConstants.ExpressLocalID);
    expect(updateShippingMethod.name).toBe('Updated Express Local');
    expect(updateShippingMethod.enabled).toBe(false);

    expect(updateShippingMethod.handler.code).toBe('flat-shipping-handler');
  });

  test('updates shipping method handler args', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_SHIPPING_METHOD_MUTATION,
        variables: {
          id: ShippingMethodConstants.StandardLocalID,
          input: {
            args: {
              price: '20000',
              space: '1kg'
            }
          }
        }
      });

    const { updateShippingMethod } = res.body.data;

    expect(updateShippingMethod.handler.args.price).toBe('20000');
    expect(updateShippingMethod.handler.args.space).toBe('1kg');
    expect(updateShippingMethod.handler.code).toBe('flat-shipping-handler');
    expect(updateShippingMethod.name).toBe('Standard Local');
  });

  test('resets shipping method handler args', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_SHIPPING_METHOD_MUTATION,
        variables: {
          id: ShippingMethodConstants.StandardLocalID,
          input: {
            args: {}
          }
        }
      });

    const { updateShippingMethod } = res.body.data;

    expect(Object.keys(updateShippingMethod.handler.args)).toHaveLength(0);
    expect(updateShippingMethod.handler.code).toBe('flat-shipping-handler');
    expect(updateShippingMethod.name).toBe('Standard Local');
  });

  test('updates a fully shipping method', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_SHIPPING_METHOD_MUTATION,
        variables: {
          id: ShippingMethodConstants.ExpressInternationalID,
          input: {
            name: 'Premium International',
            enabled: false,
            args: {
              price: '50000'
            }
          }
        }
      });

    const { updateShippingMethod } = res.body.data;

    expect(updateShippingMethod.name).toBe('Premium International');
    expect(updateShippingMethod.enabled).toBe(false);
    expect(updateShippingMethod.handler.args.price).toBe('50000');
    expect(updateShippingMethod.handler.code).toBe('flat-shipping-handler');
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: UPDATE_SHIPPING_METHOD_MUTATION,
        variables: {
          id: ShippingMethodConstants.ExpressLocalID,
          input: {
            name: 'Test method'
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const UPDATE_SHIPPING_METHOD_MUTATION = /* GraphQL */ `
  mutation UpdateShippingMethod($id: ID!, $input: UpdateShippingMethodInput!) {
    updateShippingMethod(id: $id, input: $input) {
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
