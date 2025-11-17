import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { PaymentMethodFixtures } from './fixtures/payment-method.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('createPaymentMethod - Mutation', () => {
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

  test('creates a payment method', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_PAYMENT_METHOD_MUTATION,
        variables: {
          input: {
            name: 'Test Payment',
            handler: {
              code: 'test-payment-handler',
              args: {
                accessToken: 'ph_access_token_123'
              }
            }
          }
        }
      });

    const {
      createPaymentMethod: { paymentMethod }
    } = res.body.data;

    expect(paymentMethod.name).toBe('Test Payment');
    expect(paymentMethod.enabled).toBe(true);
    expect(paymentMethod.handler.code).toBe('test-payment-handler');
    expect(paymentMethod.handler.args.accessToken).toBe('ph_access_token_123');
  });

  test('returns HANDLER_NOT_FOUND error when handler code is not found in config', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_PAYMENT_METHOD_MUTATION,
        variables: {
          input: {
            name: 'non existing handler',
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
      createPaymentMethod: { paymentMethod, apiErrors }
    } = res.body.data;

    expect(paymentMethod).toBeNull();
    expect(apiErrors[0].code).toBe('HANDLER_NOT_FOUND');
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: CREATE_PAYMENT_METHOD_MUTATION,
        variables: {
          input: {
            name: 'Test method',
            handler: {
              code: 'stripe-payment-handler',
              args: {
                apiKey: 'sk_test_123'
              }
            }
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const CREATE_PAYMENT_METHOD_MUTATION = /* GraphQL */ `
  mutation CreatePaymentMethod($input: CreatePaymentMethodInput!) {
    createPaymentMethod(input: $input) {
      apiErrors {
        code
        message
      }
      paymentMethod {
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
