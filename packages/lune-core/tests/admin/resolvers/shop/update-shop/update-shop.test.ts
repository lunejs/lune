import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('updateShop - Mutation', () => {
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

  test('updates shop name', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .send({
        query: UPDATE_SHOP_MUTATION,
        variables: {
          id: ShopConstants.ExistingID,
          input: {
            name: 'Updated Store Name'
          }
        }
      });

    const { apiErrors, shop } = res.body.data.updateShop;

    expect(apiErrors).toEqual([]);
    expect(shop.name).toBe('Updated Store Name');
    expect(shop.email).toBe(ShopConstants.ExistingEmail);
  });

  test('updates shop email', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .send({
        query: UPDATE_SHOP_MUTATION,
        variables: {
          id: ShopConstants.ExistingID,
          input: {
            email: 'new@email.com'
          }
        }
      });

    const { apiErrors, shop } = res.body.data.updateShop;

    expect(apiErrors).toEqual([]);
    expect(shop.email).toBe('new@email.com');
  });

  test('updates shop with same email (no conflict)', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .send({
        query: UPDATE_SHOP_MUTATION,
        variables: {
          id: ShopConstants.ExistingID,
          input: {
            email: ShopConstants.ExistingEmail
          }
        }
      });

    const { apiErrors, shop } = res.body.data.updateShop;

    expect(apiErrors).toEqual([]);
    expect(shop.email).toBe(ShopConstants.ExistingEmail);
  });

  test('updates shop socials', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .send({
        query: UPDATE_SHOP_MUTATION,
        variables: {
          id: ShopConstants.ExistingID,
          input: {
            socials: {
              facebook: 'https://facebook.com/lune',
              twitter: 'https://twitter.com/lune',
              instagram: 'https://instagram.com/lune'
            }
          }
        }
      });

    const { apiErrors, shop } = res.body.data.updateShop;

    expect(apiErrors).toEqual([]);
    expect(shop.socials).toEqual({
      facebook: 'https://facebook.com/lune',
      twitter: 'https://twitter.com/lune',
      instagram: 'https://instagram.com/lune'
    });
  });

  test('updates shop with partial socials (some null)', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .send({
        query: UPDATE_SHOP_MUTATION,
        variables: {
          id: ShopConstants.ExistingID,
          input: {
            socials: {
              facebook: 'https://facebook.com/lune',
              twitter: null,
              instagram: null
            }
          }
        }
      });

    const { apiErrors, shop } = res.body.data.updateShop;

    expect(apiErrors).toEqual([]);
    expect(shop.socials).toEqual({
      facebook: 'https://facebook.com/lune',
      twitter: null,
      instagram: null
    });
  });

  test('updates shop with null logo', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .send({
        query: UPDATE_SHOP_MUTATION,
        variables: {
          id: ShopConstants.ExistingID,
          input: {
            logo: null
          }
        }
      });

    const { apiErrors, shop } = res.body.data.updateShop;

    expect(apiErrors).toEqual([]);
    expect(shop.logo).toBeNull();
  });

  test('updates shop with null storefrontUrl', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .send({
        query: UPDATE_SHOP_MUTATION,
        variables: {
          id: ShopConstants.ExistingID,
          input: {
            storefrontUrl: null
          }
        }
      });

    const { apiErrors, shop } = res.body.data.updateShop;

    expect(apiErrors).toEqual([]);
    expect(shop.storefrontUrl).toBeNull();
  });

  test('returns EMAIL_ALREADY_EXISTS error when email is already in use by another shop', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .send({
        query: UPDATE_SHOP_MUTATION,
        variables: {
          id: ShopConstants.ExistingID,
          input: {
            email: ShopConstants.OtherShopEmail
          }
        }
      });

    const { apiErrors, shop } = res.body.data.updateShop;

    expect(apiErrors[0].code).toBe('EMAIL_ALREADY_EXISTS');
    expect(shop).toBeNull();
  });

  test('returns Authorization error when no token is provided', async () => {
    const res = await request(app)
      .post('/admin-api')
      .send({
        query: UPDATE_SHOP_MUTATION,
        variables: {
          id: ShopConstants.ExistingID,
          input: {
            name: 'Updated Store Name'
          }
        }
      });

    expect(res.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const UPDATE_SHOP_MUTATION = /* GraphQL */ `
  mutation UpdateShop($id: ID!, $input: UpdateShopInput!) {
    updateShop(id: $id, input: $input) {
      apiErrors {
        code
        message
      }
      shop {
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
