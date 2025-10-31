import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { AssetConstants, AssetFixtures } from './fixtures/asset.fixtures';
import { CollectionConstants, CollectionFixtures } from './fixtures/collection.fixtures';
import { CollectionAssetFixtures } from './fixtures/collection-assets.fixtures';
import { CollectionProductFixtures } from './fixtures/collection-product.fixtures';
import { ProductConstants, ProductFixtures } from './fixtures/product.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('updateCollection - Mutation', () => {
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

  test('update a basic collection', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_COLLECTION_MUTATION,
        variables: {
          id: CollectionConstants.EllieCollection,
          input: {
            name: 'Updated Collection Name',
            description: 'Updated description for the collection'
          }
        }
      });

    const { updateCollection } = res.body.data;

    expect(updateCollection.id).toBe(CollectionConstants.EllieCollection);
    expect(updateCollection.name).toBe('Updated Collection Name');
    expect(updateCollection.description).toBe('Updated description for the collection');
    expect(updateCollection.slug).toBe(CollectionConstants.EllieCollectionSlug);
  });

  test('set null description', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_COLLECTION_MUTATION,
        variables: {
          id: CollectionConstants.EllieCollection,
          input: {
            description: null
          }
        }
      });

    const { updateCollection } = res.body.data;

    expect(updateCollection.id).toBe(CollectionConstants.EllieCollection);
    expect(updateCollection.description).toBe(null);
  });

  test('update enabled status', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_COLLECTION_MUTATION,
        variables: {
          id: CollectionConstants.EllieCollection,
          input: {
            enabled: false
          }
        }
      });

    const { updateCollection } = res.body.data;

    expect(updateCollection.id).toBe(CollectionConstants.EllieCollection);
    expect(updateCollection.enabled).toBe(false);
  });

  test('add new assets to collection', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_COLLECTION_MUTATION,
        variables: {
          id: CollectionConstants.JoelCollection,
          input: {
            assets: [
              { id: AssetConstants.ImageID, order: 0 },
              { id: AssetConstants.MeImageID, order: 1 }
            ]
          }
        }
      });

    const { updateCollection } = res.body.data;

    expect(updateCollection.id).toBe(CollectionConstants.JoelCollection);
    expect(updateCollection.assets.items).toHaveLength(2);
    expect(updateCollection.assets.count).toBe(2);
    expect(updateCollection.assets.items[0].id).toBe(AssetConstants.ImageID);
    expect(updateCollection.assets.items[1].id).toBe(AssetConstants.MeImageID);
  });

  test('re order assets', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_COLLECTION_MUTATION,
        variables: {
          id: CollectionConstants.EllieCollection,
          input: {
            assets: [
              { id: AssetConstants.ImageID, order: 0 },
              { id: AssetConstants.EllieImageID, order: 1 }
            ]
          }
        }
      });

    const { updateCollection } = res.body.data;

    expect(updateCollection.id).toBe(CollectionConstants.EllieCollection);
    expect(updateCollection.assets.items[0].id).toBe(AssetConstants.ImageID);
    expect(updateCollection.assets.items[1].id).toBe(AssetConstants.EllieImageID);
    expect(updateCollection.assets.count).toBe(2);
  });

  test('remove all assets from collection', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_COLLECTION_MUTATION,
        variables: {
          id: CollectionConstants.EllieCollection,
          input: {
            assets: []
          }
        }
      });

    const { updateCollection } = res.body.data;

    expect(updateCollection.id).toBe(CollectionConstants.EllieCollection);
    expect(updateCollection.assets.items).toHaveLength(0);
    expect(updateCollection.assets.count).toBe(0);
  });

  test('add new products to collection', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_COLLECTION_MUTATION,
        variables: {
          id: CollectionConstants.JoelCollection,
          input: {
            products: [
              ProductConstants.ShirtID,
              ProductConstants.SneakersID,
              ProductConstants.BeachShirtID
            ]
          }
        }
      });

    const { updateCollection } = res.body.data;

    expect(updateCollection.id).toBe(CollectionConstants.JoelCollection);
    expect(updateCollection.products.items).toHaveLength(3);
    expect(
      updateCollection.products.items.find(p => p.id === ProductConstants.ShirtID)
    ).toBeDefined();
    expect(
      updateCollection.products.items.find(p => p.id === ProductConstants.SneakersID)
    ).toBeDefined();
    expect(
      updateCollection.products.items.find(p => p.id === ProductConstants.BeachShirtID)
    ).toBeDefined();
  });

  test('remove all products from collection', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_COLLECTION_MUTATION,
        variables: {
          id: CollectionConstants.EllieCollection,
          input: {
            products: []
          }
        }
      });

    const { updateCollection } = res.body.data;

    expect(updateCollection.id).toBe(CollectionConstants.EllieCollection);
    expect(updateCollection.products.items).toHaveLength(0);
  });

  test('add new sub collections to collection', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_COLLECTION_MUTATION,
        variables: {
          id: CollectionConstants.ParentCollection1,
          input: {
            subCollections: [
              CollectionConstants.EllieCollection,
              CollectionConstants.JoelCollection
            ]
          }
        }
      });

    const { updateCollection } = res.body.data;

    expect(updateCollection.id).toBe(CollectionConstants.ParentCollection1);
    expect(updateCollection.subCollections.items).toHaveLength(2);
    expect(
      updateCollection.subCollections.items.find(c => c.id === CollectionConstants.EllieCollection)
    ).toBeDefined();
    expect(
      updateCollection.subCollections.items.find(c => c.id === CollectionConstants.JoelCollection)
    ).toBeDefined();
  });

  test('replace sub collections in collection', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_COLLECTION_MUTATION,
        variables: {
          id: CollectionConstants.ParentCollection1,
          input: {
            subCollections: [
              CollectionConstants.JoelCollection,
              CollectionConstants.ParentCollection2
            ]
          }
        }
      });

    const { updateCollection } = res.body.data;

    expect(updateCollection.id).toBe(CollectionConstants.ParentCollection1);
    expect(updateCollection.subCollections.items).toHaveLength(2);
    expect(
      updateCollection.subCollections.items.find(
        c => c.id === CollectionConstants.ParentCollection2
      )
    ).toBeDefined();
    expect(
      updateCollection.subCollections.items.find(c => c.id === CollectionConstants.JoelCollection)
    ).toBeDefined();
  });

  test('remove all sub collections from collection', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_COLLECTION_MUTATION,
        variables: {
          id: CollectionConstants.ParentCollection1,
          input: {
            subCollections: []
          }
        }
      });

    const { updateCollection } = res.body.data;

    expect(updateCollection.id).toBe(CollectionConstants.ParentCollection1);
    expect(updateCollection.subCollections.items).toHaveLength(0);
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: UPDATE_COLLECTION_MUTATION,
        variables: {
          id: CollectionConstants.EllieCollection,
          input: {
            name: 'Updated Name'
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const UPDATE_COLLECTION_MUTATION = /* GraphQL */ `
  mutation UpdateCollection($id: ID!, $input: UpdateCollectionInput!) {
    updateCollection(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      name
      slug
      description
      enabled
      contentType
      assets {
        count
        items {
          id
          source
        }
      }
      products {
        items {
          id
        }
      }
      subCollections {
        items {
          id
        }
      }
    }
  }
`;
