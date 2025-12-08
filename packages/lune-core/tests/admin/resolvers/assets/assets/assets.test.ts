import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { AssetConstants, AssetFixtures } from './fixtures/asset.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('assets - Query', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([new UserFixtures(), new ShopFixtures(), new AssetFixtures()]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('returns a list of assets with pagination', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_ASSETS_QUERY,
        variables: {
          input: {
            skip: 1,
            take: 2
          }
        }
      });

    const { assets } = res.body.data;

    expect(assets.items).toHaveLength(2);
    expect(assets.count).toBe(2);
    expect(assets.pageInfo.total).toBe(6);
    expect(assets.items[0].id).toBe(AssetConstants.MeImageID);
    expect(assets.items[1].id).toBe(AssetConstants.JoelImageID);
  });

  test('returns a list of assets with filename filter', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_ASSETS_QUERY,
        variables: {
          input: {
            filters: {
              filename: { contains: 'm' }
            }
          }
        }
      });

    const { assets } = res.body.data;

    expect(assets.items).toHaveLength(2);
    expect(assets.count).toBe(2);
    expect(assets.pageInfo.total).toBe(2);
    expect(assets.items[0].id).toBe(AssetConstants.ImageID);
    expect(assets.items[1].id).toBe(AssetConstants.MeImageID);
  });

  test('returns a list of collections with filename filter and pagination', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_ASSETS_QUERY,
        variables: {
          input: {
            filters: {
              filename: { contains: 'el' }
            },
            take: 2
          }
        }
      });

    const { assets } = res.body.data;

    expect(assets.items).toHaveLength(2);
    expect(assets.count).toBe(2);
    expect(assets.pageInfo.total).toBe(4);
    expect(assets.items[0].id).toBe(AssetConstants.JoelImageID);
    expect(assets.items[1].id).toBe(AssetConstants.EllieImageID);
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app).post('/admin-api').send({
      query: GET_ASSETS_QUERY,
      variables: {}
    });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const GET_ASSETS_QUERY = /* GraphQL */ `
  query Assets($input: AssetListInput) {
    assets(input: $input) {
      items {
        id
        createdAt
        filename
        ext
        source
        providerId
        mimeType
      }
      count
      pageInfo {
        total
      }
    }
  }
`;
