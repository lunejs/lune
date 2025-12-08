import request from 'supertest';

import type { ID } from '@/index';
import type { DiscountTable } from '@/persistence/entities/discount';
import { Tables } from '@/persistence/tables';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { DiscountConstants, DiscountFixtures } from './fixtures/discount.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('removeDiscounts - Mutation', () => {
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

  test('soft removes a single discount', async () => {
    const prevDiscount = await getDiscount(testHelper, DiscountConstants.Summer2025ID);

    expect(prevDiscount).toBeDefined();
    expect(prevDiscount?.deleted_at).toBeNull();

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: REMOVE_DISCOUNTS_MUTATION,
        variables: {
          ids: [DiscountConstants.Summer2025ID]
        }
      });

    const { removeDiscounts } = res.body.data;

    expect(removeDiscounts).toBe(true);

    const afterDiscount = await getDiscount(testHelper, DiscountConstants.Summer2025ID);

    expect(afterDiscount).toBeDefined();
    expect(afterDiscount?.deleted_at).not.toBeNull();
  });

  test('soft removes multiple discounts', async () => {
    const [prevDiscount1, prevDiscount2, prevDiscount3] = await Promise.all([
      getDiscount(testHelper, DiscountConstants.Summer2025ID),
      getDiscount(testHelper, DiscountConstants.Winter2025ID),
      getDiscount(testHelper, DiscountConstants.Spring2025ID)
    ]);

    expect(prevDiscount1?.deleted_at).toBeNull();
    expect(prevDiscount2?.deleted_at).toBeNull();
    expect(prevDiscount3?.deleted_at).toBeNull();

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: REMOVE_DISCOUNTS_MUTATION,
        variables: {
          ids: [
            DiscountConstants.Summer2025ID,
            DiscountConstants.Winter2025ID,
            DiscountConstants.Spring2025ID
          ]
        }
      });

    const { removeDiscounts } = res.body.data;

    expect(removeDiscounts).toBe(true);

    const [afterDiscount1, afterDiscount2, afterDiscount3] = await Promise.all([
      getDiscount(testHelper, DiscountConstants.Summer2025ID),
      getDiscount(testHelper, DiscountConstants.Winter2025ID),
      getDiscount(testHelper, DiscountConstants.Spring2025ID)
    ]);

    expect(afterDiscount1?.deleted_at).not.toBeNull();
    expect(afterDiscount2?.deleted_at).not.toBeNull();
    expect(afterDiscount3?.deleted_at).not.toBeNull();
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: REMOVE_DISCOUNTS_MUTATION,
        variables: {
          ids: [DiscountConstants.Summer2025ID]
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const REMOVE_DISCOUNTS_MUTATION = /* GraphQL */ `
  mutation RemoveDiscounts($ids: [ID!]!) {
    removeDiscounts(ids: $ids)
  }
`;

const getDiscount = async (testHelper: TestUtils, discountId: ID) => {
  return await testHelper
    .getQueryBuilder()<DiscountTable>(Tables.Discount)
    .where('id', discountId)
    .first();
};
