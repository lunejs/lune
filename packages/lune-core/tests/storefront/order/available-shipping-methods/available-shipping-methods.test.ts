import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { CountryFixtures } from './fixtures/country.fixtures';
import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import {
  ShippingMethodConstants,
  ShippingMethodFixtures
} from './fixtures/shipping-method.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { StateFixtures } from './fixtures/state.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';
import { ZoneFixtures } from './fixtures/zone.fixtures';
import { ZoneStateFixtures } from './fixtures/zone-state.fixtures';

describe('availableShippingMethods - Query', () => {
  const testHelper = new TestUtils();

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
      new ShippingMethodFixtures(),
      new OrderFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('returns enabled shipping methods ordered by createdAt', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: AVAILABLE_SHIPPING_METHODS_QUERY,
        variables: { orderId: OrderConstants.WithNewYorkAddressID }
      });

    const { availableShippingMethods } = res.body.data;

    expect(availableShippingMethods).toHaveLength(2);

    expect(availableShippingMethods[0].id).toBe(ShippingMethodConstants.ExpressID);
    expect(availableShippingMethods[1].id).toBe(ShippingMethodConstants.StandardID);

    const ids = availableShippingMethods.map((sm: { id: string }) => sm.id);
    expect(ids).not.toContain(ShippingMethodConstants.DisabledID);
  });

  test('returns empty array when no shipping methods available', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: AVAILABLE_SHIPPING_METHODS_QUERY,
        variables: { orderId: OrderConstants.WithCaliforniaAddressID }
      });

    const { availableShippingMethods } = res.body.data;

    expect(availableShippingMethods).toHaveLength(0);
  });

  test('returns empty array when order has no shipping address', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: AVAILABLE_SHIPPING_METHODS_QUERY,
        variables: { orderId: OrderConstants.WithoutShippingAddressID }
      });

    const { availableShippingMethods } = res.body.data;

    expect(availableShippingMethods).toHaveLength(0);
  });

  test('returns UNAUTHORIZED error when storefront api key is invalid', async () => {
    const response = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', 'invalid_key')
      .send({
        query: AVAILABLE_SHIPPING_METHODS_QUERY,
        variables: { orderId: OrderConstants.WithNewYorkAddressID }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });

  test('returns UNAUTHORIZED error when no shop id is provided', async () => {
    const response = await request(app)
      .post('/storefront-api')
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: AVAILABLE_SHIPPING_METHODS_QUERY,
        variables: { orderId: OrderConstants.WithNewYorkAddressID }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const AVAILABLE_SHIPPING_METHODS_QUERY = /* GraphQL */ `
  query AvailableShippingMethods($orderId: ID!) {
    availableShippingMethods(orderId: $orderId) {
      id
      name
    }
  }
`;
