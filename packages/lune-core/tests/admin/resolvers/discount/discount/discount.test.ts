import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { DiscountConstants, DiscountFixtures } from './fixtures/discount.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('discount - Query', () => {
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

  test('returns discount by id', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_DISCOUNT_QUERY,
        variables: {
          id: DiscountConstants.ActiveCodeDiscountID
        }
      });

    const { discount } = res.body.data;

    expect(discount.id).toBe(DiscountConstants.ActiveCodeDiscountID);
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: GET_DISCOUNT_QUERY,
        variables: {
          id: DiscountConstants.ActiveCodeDiscountID
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const GET_DISCOUNT_QUERY = /* GraphQL */ `
  query Discount($id: ID!) {
    discount(id: $id) {
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
`;
