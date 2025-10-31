import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { AssetConstants, AssetFixtures } from './fixtures/asset.fixtures';
import { CollectionConstants, CollectionFixtures } from './fixtures/collection.fixtures';
import { CollectionAssetFixtures } from './fixtures/collection-assets.fixtures';
import { CollectionProductFixtures } from './fixtures/collection-product.fixtures';
import { ProductFixtures } from './fixtures/product.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('collection - Query', () => {
  const testHelper = new TestHelper();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new CollectionFixtures(),
      new ProductFixtures(),
      new AssetFixtures(),
      new CollectionProductFixtures(),
      new CollectionAssetFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('returns collection by id', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_COLLECTION_QUERY,
        variables: {
          id: CollectionConstants.AlesCollection
        }
      });

    const { collection } = res.body.data;

    expect(collection.id).toBe(CollectionConstants.AlesCollection);
  });

  test('returns collection by slug', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_COLLECTION_QUERY,
        variables: {
          slug: CollectionConstants.EllieCollectionSlug
        }
      });

    const { collection } = res.body.data;

    expect(collection.slug).toBe(CollectionConstants.EllieCollectionSlug);
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app).post('/admin-api').send({
      query: GET_COLLECTION_QUERY,
      variables: {}
    });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });

  test('returns collection assets', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_COLLECTION_QUERY,
        variables: {
          id: CollectionConstants.EllieCollection
        }
      });

    const { collection } = res.body.data;

    expect(collection.id).toBe(CollectionConstants.EllieCollection);

    expect(collection.assets.items).toHaveLength(2);
    expect(collection.assets.items[0].id).toBe(AssetConstants.EllieImageID);
    expect(collection.assets.items[1].id).toBe(AssetConstants.ImageID);
  });

  test('returns collection assets with pagination', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_COLLECTION_QUERY,
        variables: {
          id: CollectionConstants.EllieCollection,
          assetsInput: {
            take: 1
          }
        }
      });

    const { collection } = res.body.data;

    expect(collection.id).toBe(CollectionConstants.EllieCollection);

    expect(collection.assets.items).toHaveLength(1);
    expect(collection.assets.items[0].id).toBe(AssetConstants.EllieImageID);
  });

  test('returns collection products', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_COLLECTION_QUERY,
        variables: {
          id: CollectionConstants.EllieCollection
        }
      });

    const { collection } = res.body.data;

    expect(collection.id).toBe(CollectionConstants.EllieCollection);
    expect(collection.products.items).toHaveLength(4);
  });

  test('returns collection products with pagination', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_COLLECTION_QUERY,
        variables: {
          id: CollectionConstants.EllieCollection,
          productsInput: {
            take: 2
          }
        }
      });

    const { collection } = res.body.data;

    expect(collection.id).toBe(CollectionConstants.EllieCollection);
    expect(collection.products.items).toHaveLength(2);
  });

  test('returns collection sub collections', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_COLLECTION_QUERY,
        variables: {
          id: CollectionConstants.ParentCollection1
        }
      });

    const { collection } = res.body.data;

    expect(collection.id).toBe(CollectionConstants.ParentCollection1);
    expect(collection.subCollections.items).toHaveLength(5);
  });

  test('returns collection sub collections with pagination', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_COLLECTION_QUERY,
        variables: {
          id: CollectionConstants.ParentCollection1,
          subCollectionsInput: {
            take: 2
          }
        }
      });

    const { collection } = res.body.data;

    expect(collection.id).toBe(CollectionConstants.ParentCollection1);
    expect(collection.subCollections.items).toHaveLength(2);
  });
});

const GET_COLLECTION_QUERY = /* GraphQL */ `
  query Collection(
    $id: ID
    $slug: String
    $assetsInput: ListInput
    $productsInput: ProductListInput
    $subCollectionsInput: CollectionListInput
  ) {
    collection(id: $id, slug: $slug) {
      id
      createdAt
      name
      slug
      description
      enabled
      contentType
      assets(input: $assetsInput) {
        items {
          id
          source
        }
      }
      products(input: $productsInput) {
        items {
          id
        }
      }
      subCollections(input: $subCollectionsInput) {
        items {
          id
        }
      }
    }
  }
`;
