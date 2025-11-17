import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { PaymentMethodConstants, PaymentMethodFixtures } from './fixtures/payment-method.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('updatePaymentMethod - Mutation', () => {
  const testHelper = new TestHelper();

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

  test('updates general payment method', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_PAYMENT_METHOD_MUTATION,
        variables: {
          id: PaymentMethodConstants.StripeID,
          input: {
            name: 'Updated Stripe',
            enabled: false
          }
        }
      });

    const { updatePaymentMethod } = res.body.data;

    expect(updatePaymentMethod.id).toBe(PaymentMethodConstants.StripeID);
    expect(updatePaymentMethod.name).toBe('Updated Stripe');
    expect(updatePaymentMethod.enabled).toBe(false);

    expect(updatePaymentMethod.handler.code).toBe('stripe-payment-handler');
  });

  test('updates payment method handler args', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_PAYMENT_METHOD_MUTATION,
        variables: {
          id: PaymentMethodConstants.PaypalID,
          input: {
            args: {
              clientId: 'new_paypal_client_456',
              clientSecret: 'new_secret_789'
            }
          }
        }
      });

    const { updatePaymentMethod } = res.body.data;

    expect(updatePaymentMethod.handler.args.clientId).toBe('new_paypal_client_456');
    expect(updatePaymentMethod.handler.args.clientSecret).toBe('new_secret_789');
    expect(updatePaymentMethod.handler.code).toBe('paypal-payment-handler');
    expect(updatePaymentMethod.name).toBe('PayPal');
  });

  test('resets payment method handler args', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_PAYMENT_METHOD_MUTATION,
        variables: {
          id: PaymentMethodConstants.PaypalID,
          input: {
            args: {}
          }
        }
      });

    const { updatePaymentMethod } = res.body.data;

    expect(Object.keys(updatePaymentMethod.handler.args)).toHaveLength(0);
    expect(updatePaymentMethod.handler.code).toBe('paypal-payment-handler');
    expect(updatePaymentMethod.name).toBe('PayPal');
  });

  test('updates a fully payment method', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_PAYMENT_METHOD_MUTATION,
        variables: {
          id: PaymentMethodConstants.StripeID,
          input: {
            name: 'Premium Stripe',
            enabled: false,
            args: {
              apiKey: 'sk_live_new_key'
            }
          }
        }
      });

    const { updatePaymentMethod } = res.body.data;

    expect(updatePaymentMethod.name).toBe('Premium Stripe');
    expect(updatePaymentMethod.enabled).toBe(false);
    expect(updatePaymentMethod.handler.args.apiKey).toBe('sk_live_new_key');
    expect(updatePaymentMethod.handler.code).toBe('stripe-payment-handler');
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: UPDATE_PAYMENT_METHOD_MUTATION,
        variables: {
          id: PaymentMethodConstants.StripeID,
          input: {
            name: 'Test method'
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const UPDATE_PAYMENT_METHOD_MUTATION = /* GraphQL */ `
  mutation UpdatePaymentMethod($id: ID!, $input: UpdatePaymentMethodInput!) {
    updatePaymentMethod(id: $id, input: $input) {
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
