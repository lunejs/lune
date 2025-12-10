import request from 'supertest';

import type { ID } from '@/index';
import type { AssetTable } from '@/persistence/entities/asset';
import { Tables } from '@/persistence/tables';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { AssetConstants, AssetFixtures } from './fixtures/asset.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('removeAssets - Mutation', () => {
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

  test('removes a single asset', async () => {
    const prevAsset = await getAsset(testHelper, AssetConstants.ImageID);

    expect(prevAsset).toBeDefined();

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: REMOVE_ASSETS_MUTATION,
        variables: {
          ids: [AssetConstants.ImageID]
        }
      });

    const { removeAssets } = res.body.data;

    expect(removeAssets).toBe(true);

    const afterAsset = await getAsset(testHelper, AssetConstants.ImageID);

    expect(afterAsset).toBeUndefined();
  });

  test('removes multiple assets', async () => {
    const [prevAsset1, prevAsset2, prevAsset3] = await Promise.all([
      getAsset(testHelper, AssetConstants.ImageID),
      getAsset(testHelper, AssetConstants.Image2ID),
      getAsset(testHelper, AssetConstants.Image3ID)
    ]);

    expect(prevAsset1).toBeDefined();
    expect(prevAsset2).toBeDefined();
    expect(prevAsset3).toBeDefined();

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: REMOVE_ASSETS_MUTATION,
        variables: {
          ids: [AssetConstants.ImageID, AssetConstants.Image2ID, AssetConstants.Image3ID]
        }
      });

    const { removeAssets } = res.body.data;

    expect(removeAssets).toBe(true);

    const [afterAsset1, afterAsset2, afterAsset3] = await Promise.all([
      getAsset(testHelper, AssetConstants.ImageID),
      getAsset(testHelper, AssetConstants.Image2ID),
      getAsset(testHelper, AssetConstants.Image3ID)
    ]);

    expect(afterAsset1).toBeUndefined();
    expect(afterAsset2).toBeUndefined();
    expect(afterAsset3).toBeUndefined();
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: REMOVE_ASSETS_MUTATION,
        variables: {
          ids: [AssetConstants.ImageID]
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const REMOVE_ASSETS_MUTATION = /* GraphQL */ `
  mutation RemoveAssets($ids: [ID!]!) {
    removeAssets(ids: $ids)
  }
`;

const getAsset = async (testHelper: TestUtils, assetId: ID) => {
  return await testHelper.getQueryBuilder()<AssetTable>(Tables.Asset).where('id', assetId).first();
};
