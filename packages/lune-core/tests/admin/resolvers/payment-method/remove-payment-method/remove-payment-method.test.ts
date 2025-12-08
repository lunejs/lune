import request from 'supertest';

import { Tables } from '@/persistence/tables';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { PaymentMethodConstants, PaymentMethodFixtures } from './fixtures/payment-method.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('removePaymentMethod - Mutation', () => {
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

  test('removes a payment method', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: REMOVE_PAYMENT_METHOD_MUTATION,
        variables: {
          id: PaymentMethodConstants.StripeID
        }
      });

    const { removePaymentMethod } = res.body.data;

    expect(removePaymentMethod).toBe(true);

    const paymentMethod = await testHelper
      .getQueryBuilder()(Tables.PaymentMethod)
      .where('id', PaymentMethodConstants.StripeID)
      .first();

    expect(paymentMethod.deleted_at).toBeDefined();
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: REMOVE_PAYMENT_METHOD_MUTATION,
        variables: {
          id: PaymentMethodConstants.StripeID
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const REMOVE_PAYMENT_METHOD_MUTATION = /* GraphQL */ `
  mutation RemovePaymentMethod($id: ID!) {
    removePaymentMethod(id: $id)
  }
`;
