import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { DiscountConstants, DiscountFixtures } from './fixtures/discount.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('updateDiscount - Mutation', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([new UserFixtures(), new ShopFixtures(), new DiscountFixtures()]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('updates discount fields', async () => {
    const startsAt = new Date('2025-06-01');
    const endsAt = new Date('2025-12-31');

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_DISCOUNT_MUTATION,
        variables: {
          id: DiscountConstants.Summer2025ID,
          input: {
            code: 'UPDATED_SUMMER',
            enabled: false,
            perCustomerLimit: 5,
            startsAt: startsAt,
            endsAt: endsAt,
            handler: {
              code: 'order-discount',
              args: {
                discountValue: { type: 'fixed', value: 500 },
                orderRequirements: { type: 'minimum_amount', value: 10000 }
              }
            }
          }
        }
      });

    const {
      updateDiscount: { discount, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(discount).toMatchObject({
      id: DiscountConstants.Summer2025ID,
      code: 'UPDATED_SUMMER',
      enabled: false,
      perCustomerLimit: 5,
      startsAt: startsAt.toISOString(),
      endsAt: endsAt.toISOString(),
      handler: {
        code: 'order-discount',
        args: {
          discountValue: { type: 'fixed', value: 500 },
          orderRequirements: { type: 'minimum_amount', value: 10000 }
        }
      }
    });
  });

  test('sets optional fields to null', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_DISCOUNT_MUTATION,
        variables: {
          id: DiscountConstants.Summer2025ID,
          input: {
            endsAt: null,
            perCustomerLimit: null
          }
        }
      });

    const {
      updateDiscount: { discount, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(discount).toMatchObject({
      id: DiscountConstants.Summer2025ID,
      endsAt: null,
      perCustomerLimit: null
    });
  });

  test('returns CODE_ALREADY_EXISTS error when updating to a duplicate code', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_DISCOUNT_MUTATION,
        variables: {
          id: DiscountConstants.Summer2025ID,
          input: {
            code: DiscountConstants.DuplicateCode
          }
        }
      });

    const {
      updateDiscount: { discount, apiErrors }
    } = res.body.data;
    const [error] = apiErrors;

    expect(error.code).toBe('CODE_ALREADY_EXISTS');
    expect(discount).toBeNull();
  });

  test('allows updating to same code', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_DISCOUNT_MUTATION,
        variables: {
          id: DiscountConstants.Summer2025ID,
          input: {
            code: DiscountConstants.Summer2025Code
          }
        }
      });

    const {
      updateDiscount: { discount, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(discount).toMatchObject({
      id: DiscountConstants.Summer2025ID,
      code: DiscountConstants.Summer2025Code
    });
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: UPDATE_DISCOUNT_MUTATION,
        variables: {
          id: DiscountConstants.Summer2025ID,
          input: {
            code: 'NO_AUTH'
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const UPDATE_DISCOUNT_MUTATION = /* GraphQL */ `
  mutation UpdateDiscount($id: ID!, $input: UpdateDiscountInput!) {
    updateDiscount(id: $id, input: $input) {
      apiErrors {
        code
        message
      }
      discount {
        id
        createdAt
        updatedAt
        code
        applicationMode
        applicationLevel
        perCustomerLimit
        startsAt
        endsAt
        enabled
        handler {
          code
          args
        }
      }
    }
  }
`;
