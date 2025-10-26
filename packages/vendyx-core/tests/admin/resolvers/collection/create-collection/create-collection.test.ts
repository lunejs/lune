import request from 'supertest';

import { VendyxServer } from '@/server';
import { TEST_VENDYX_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { AssetConstants, AssetFixtures } from './fixtures/asset.fixtures';
import { CollectionConstants, CollectionFixtures } from './fixtures/collection.fixtures';
import { CollectionAssetFixtures } from './fixtures/collection-assets.fixtures';
import { CollectionProductFixtures } from './fixtures/collection-product.fixtures';
import { ProductFixtures } from './fixtures/product.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('product - Query', () => {
  const testHelper = new TestHelper();

  const vendyxServer = new VendyxServer(TEST_VENDYX_CONFIG);
  const app = vendyxServer.getApp();

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
    await vendyxServer.teardown();
  });

  test('creates a basic collection', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_COLLECTION_MUTATION,
        variables: {
          input: {
            name: 'Rain',
            description: 'One of the biggest creation of humanity'
          }
        }
      });

    const { createCollection } = res.body.data;

    expect(createCollection.slug).toBe('rain');
    expect(createCollection.enabled).toBe(true);
    expect(createCollection.contentType).toBe('PRODUCTS');
  });

  test('creates a collection with the same name', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_COLLECTION_MUTATION,
        variables: {
          input: {
            name: CollectionConstants.EllieCollectionName
          }
        }
      });

    const { createCollection } = res.body.data;

    expect(createCollection.slug).toBe('ellie-1');
    expect(createCollection.enabled).toBe(true);
    expect(createCollection.contentType).toBe('PRODUCTS');
  });

  test('creates a collection with a name that generates same slug', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_COLLECTION_MUTATION,
        variables: {
          input: {
            name: CollectionConstants.EllieCollectionName.toUpperCase()
          }
        }
      });

    const { createCollection } = res.body.data;

    expect(createCollection.slug).toBe('ellie-1');
    expect(createCollection.enabled).toBe(true);
    expect(createCollection.contentType).toBe('PRODUCTS');
  });

  test('creates a collection with a name that is repeated more than once', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_COLLECTION_MUTATION,
        variables: {
          input: {
            name: CollectionConstants.MultipleSameName
          }
        }
      });

    const { createCollection } = res.body.data;

    expect(createCollection.slug).toBe('ale-2');
  });

  test('creates a collection with a name that is not repeated but its generated slug is', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_COLLECTION_MUTATION,
        variables: {
          input: {
            name: CollectionConstants.NoMatchingName
          }
        }
      });

    const { createCollection } = res.body.data;

    expect(createCollection.slug).toBe('elizabeth-1');
  });

  test.skip('creates a collection with assets', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_COLLECTION_MUTATION,
        variables: {
          input: {
            name: 'Electronics',
            assets: [
              { id: AssetConstants.ImageID, order: 0 },
              { id: AssetConstants.MeImageID, order: 1 }
            ]
          }
        }
      });

    const { createCollection } = res.body.data;

    expect(createCollection.assets.items).toHaveLength(2);
    expect(createCollection.assets.count).toBe(2);
    expect(createCollection.assets.items[0].id === AssetConstants.ImageID);
    expect(createCollection.assets.items[1].id === AssetConstants.MeImageID);
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: CREATE_COLLECTION_MUTATION,
        variables: {
          input: {
            name: ''
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const CREATE_COLLECTION_MUTATION = /* GraphQL */ `
  mutation CreateCollection($input: CreateCollectionInput!) {
    createCollection(input: $input) {
      id
      createdAt
      updatedAt
      name
      slug
      description
      enabled
      contentType
    }
  }
`;
