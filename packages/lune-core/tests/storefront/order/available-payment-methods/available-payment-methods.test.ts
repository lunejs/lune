import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { PaymentMethodConstants, PaymentMethodFixtures } from './fixtures/payment-method.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';

describe('availablePaymentMethods - Query', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new PaymentMethodFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('returns enabled payment methods ordered by createdAt', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: AVAILABLE_PAYMENT_METHODS_QUERY
      });

    const { availablePaymentMethods } = res.body.data;

    expect(availablePaymentMethods).toHaveLength(2);

    expect(availablePaymentMethods[0].id).toBe(PaymentMethodConstants.EnabledID);
    expect(availablePaymentMethods[1].id).toBe(PaymentMethodConstants.EnabledOlderID);

    const ids = availablePaymentMethods.map((pm: { id: string }) => pm.id);
    expect(ids).not.toContain(PaymentMethodConstants.DisabledID);
  });

  test('returns UNAUTHORIZED error when storefront api key is invalid', async () => {
    const response = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', 'invalid_key')
      .send({
        query: AVAILABLE_PAYMENT_METHODS_QUERY
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });

  test('returns UNAUTHORIZED error when no shop id is provided', async () => {
    const response = await request(app)
      .post('/storefront-api')
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: AVAILABLE_PAYMENT_METHODS_QUERY
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const AVAILABLE_PAYMENT_METHODS_QUERY = /* GraphQL */ `
  query AvailablePaymentMethods {
    availablePaymentMethods {
      id
      name
    }
  }
`;
