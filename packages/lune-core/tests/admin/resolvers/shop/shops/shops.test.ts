import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('shops - Query', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([new UserFixtures(), new ShopFixtures()]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('returns shops with no params', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .send({
        query: GET_SHOPS_BY_SLUG_QUERY
      });

    const { shops } = res.body.data;

    expect(shops.count).toBe(3);
    expect(shops.pageInfo.total).toBe(3);
    expect(shops.items.length).toBe(3);
  });

  test('returns shops with skip param', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .send({
        query: GET_SHOPS_BY_SLUG_QUERY,
        variables: {
          input: {
            skip: 1
          }
        }
      });

    const { shops } = res.body.data;

    expect(shops.count).toBe(2);
    expect(shops.pageInfo.total).toBe(3);
    expect(shops.items.length).toBe(2);
  });

  test('returns shops with take param', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .send({
        query: GET_SHOPS_BY_SLUG_QUERY,
        variables: {
          input: {
            take: 1
          }
        }
      });

    const { shops } = res.body.data;

    expect(shops.count).toBe(1);
    expect(shops.pageInfo.total).toBe(3);
    expect(shops.items.length).toBe(1);
  });

  test('returns Authorization error when no token is provided', async () => {
    const res = await request(app).post('/admin-api').send({
      query: GET_SHOPS_BY_SLUG_QUERY
    });

    expect(res.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const GET_SHOPS_BY_SLUG_QUERY = /* GraphQL */ `
  query Shops($input: ListInput) {
    shops(input: $input) {
      count
      pageInfo {
        total
      }
      items {
        id
        name
        slug
        storefrontApiKey
        email
        phoneNumber
        logo
        storefrontUrl
        socials {
          facebook
          twitter
          instagram
        }
      }
    }
  }
`;
