import request from 'supertest';

import type { ID } from '@/index';
import type { AssetTable } from '@/persistence/entities/asset';
import type { CollectionAssetTable } from '@/persistence/entities/collection-asset';
import type { ProductAssetTable } from '@/persistence/entities/product-asset';
import type { VariantAssetTable } from '@/persistence/entities/variant-asset';
import { Tables } from '@/persistence/tables';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { AssetConstants, AssetFixtures } from './fixtures/asset.fixtures';
import { CollectionFixtures } from './fixtures/collection.fixtures';
import { CollectionAssetFixtures } from './fixtures/collection-asset.fixtures';
import { ProductFixtures } from './fixtures/product.fixtures';
import { ProductAssetFixtures } from './fixtures/product-asset.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';
import { VariantFixtures } from './fixtures/variant.fixtures';
import { VariantAssetFixtures } from './fixtures/variant-asset.fixtures';

describe('removeAssets - Mutation', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new AssetFixtures(),
      new ProductFixtures(),
      new CollectionFixtures(),
      new VariantFixtures(),
      new ProductAssetFixtures(),
      new CollectionAssetFixtures(),
      new VariantAssetFixtures()
    ]);
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

  test('removes asset linked to a product', async () => {
    const prevAsset = await getAsset(testHelper, AssetConstants.ImageID);
    const prevProductAsset = await getProductAsset(testHelper, AssetConstants.ImageID);

    expect(prevAsset).toBeDefined();
    expect(prevProductAsset).toBeDefined();

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
    const afterProductAsset = await getProductAsset(testHelper, AssetConstants.ImageID);

    expect(afterAsset).toBeUndefined();
    expect(afterProductAsset).toBeUndefined();
  });

  test('removes asset linked to a collection', async () => {
    const prevAsset = await getAsset(testHelper, AssetConstants.Image2ID);
    const prevCollectionAsset = await getCollectionAsset(testHelper, AssetConstants.Image2ID);

    expect(prevAsset).toBeDefined();
    expect(prevCollectionAsset).toBeDefined();

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: REMOVE_ASSETS_MUTATION,
        variables: {
          ids: [AssetConstants.Image2ID]
        }
      });

    const { removeAssets } = res.body.data;

    expect(removeAssets).toBe(true);

    const afterAsset = await getAsset(testHelper, AssetConstants.Image2ID);
    const afterCollectionAsset = await getCollectionAsset(testHelper, AssetConstants.Image2ID);

    expect(afterAsset).toBeUndefined();
    expect(afterCollectionAsset).toBeUndefined();
  });

  test('removes asset linked to a variant', async () => {
    const prevAsset = await getAsset(testHelper, AssetConstants.Image3ID);
    const prevVariantAsset = await getVariantAsset(testHelper, AssetConstants.Image3ID);

    expect(prevAsset).toBeDefined();
    expect(prevVariantAsset).toBeDefined();

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: REMOVE_ASSETS_MUTATION,
        variables: {
          ids: [AssetConstants.Image3ID]
        }
      });

    const { removeAssets } = res.body.data;

    expect(removeAssets).toBe(true);

    const afterAsset = await getAsset(testHelper, AssetConstants.Image3ID);
    const afterVariantAsset = await getVariantAsset(testHelper, AssetConstants.Image3ID);

    expect(afterAsset).toBeUndefined();
    expect(afterVariantAsset).toBeUndefined();
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

const getProductAsset = async (testHelper: TestUtils, assetId: ID) => {
  return await testHelper
    .getQueryBuilder()<ProductAssetTable>(Tables.ProductAsset)
    .where('asset_id', assetId)
    .first();
};

const getCollectionAsset = async (testHelper: TestUtils, assetId: ID) => {
  return await testHelper
    .getQueryBuilder()<CollectionAssetTable>(Tables.CollectionAsset)
    .where('asset_id', assetId)
    .first();
};

const getVariantAsset = async (testHelper: TestUtils, assetId: ID) => {
  return await testHelper
    .getQueryBuilder()<VariantAssetTable>(Tables.VariantAsset)
    .where('asset_id', assetId)
    .first();
};
