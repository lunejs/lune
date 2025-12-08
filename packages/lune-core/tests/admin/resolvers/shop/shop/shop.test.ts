import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('shop - Query', () => {
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

  test('returns shop by slug', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .send({
        query: GET_SHOP_BY_SLUG_QUERY,
        variables: {
          slug: ShopConstants.ExistingSlug
        }
      });

    const { shop } = res.body.data;

    expect(shop.slug).toBe('lune-store');
  });

  test('returns null for non-existing shop slug', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .send({
        query: GET_SHOP_BY_SLUG_QUERY,
        variables: {
          slug: 'non-existing-slug'
        }
      });

    const { shop } = res.body.data;

    expect(shop).toBeNull();
  });

  test('returns Authorization error when no token is provided', async () => {
    const res = await request(app)
      .post('/admin-api')
      .send({
        query: GET_SHOP_BY_SLUG_QUERY,
        variables: {
          slug: ShopConstants.ExistingSlug
        }
      });

    expect(res.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const GET_SHOP_BY_SLUG_QUERY = /* GraphQL */ `
  query Shop($slug: String!) {
    shop(slug: $slug) {
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
`;
