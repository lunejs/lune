import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('createShop - Mutation', () => {
  const testHelper = new TestHelper();

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

  test('creates shop with valid input', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .send({
        query: CREATE_SHOP_MUTATION,
        variables: {
          input: {
            name: 'Lune store',
            email: 'lune@store.com',
            phoneNumber: '+526671624203'
          }
        }
      });

    const { apiErrors, shop } = res.body.data.createShop;

    expect(apiErrors).toEqual([]);
    expect(shop.slug).toBe('lune-store');
  });

  test('returns EMAIL_ALREADY_EXISTS error when email is already in use by another shop', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .send({
        query: CREATE_SHOP_MUTATION,
        variables: {
          input: {
            name: 'Lune store',
            email: ShopConstants.ExistingEmail,
            phoneNumber: '+526671624203'
          }
        }
      });

    const { apiErrors, shop } = res.body.data.createShop;

    expect(apiErrors[0].code).toBe('EMAIL_ALREADY_EXISTS');
    expect(shop).toBeNull();
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: CREATE_SHOP_MUTATION,
        variables: {
          input: {
            name: 'Lune store',
            email: 'lune@store.com',
            phoneNumber: '+526671624203'
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

export const CREATE_SHOP_MUTATION = /* GraphQL */ `
  mutation CreateShop($input: CreateShopInput!) {
    createShop(input: $input) {
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
