import request from 'supertest';

import type { ID } from '@/index';
import type { CollectionTable } from '@/persistence/entities/collection';
import type { CollectionAssetTable } from '@/persistence/entities/collection-asset';
import type { CollectionCustomFieldTable } from '@/persistence/entities/collection-custom-field';
import type { CollectionProductTable } from '@/persistence/entities/collection-product';
import type { CollectionTranslationTable } from '@/persistence/entities/collection-translation';
import { Tables } from '@/persistence/tables';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { AssetFixtures } from './fixtures/asset.fixtures';
import { CollectionConstants, CollectionFixtures } from './fixtures/collection.fixtures';
import { CollectionAssetFixtures } from './fixtures/collection-assets.fixtures';
import { CollectionCustomFieldFixtures } from './fixtures/collection-custom-field.fixtures';
import { CollectionProductFixtures } from './fixtures/collection-product.fixtures';
import { CollectionTranslationFixtures } from './fixtures/collection-translation.fixtures';
import { CustomFieldDefinitionFixtures } from './fixtures/custom-field-definition.fixtures';
import { ProductFixtures } from './fixtures/product.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('removeCollection - Mutation', () => {
  const testHelper = new TestUtils();

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
      new CollectionAssetFixtures(),
      new CollectionTranslationFixtures(),
      new CustomFieldDefinitionFixtures(),
      new CollectionCustomFieldFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('remove a collection with all related data', async () => {
    const prevCollection = await getCollection(testHelper, CollectionConstants.EllieCollection);

    expect(prevCollection.collection).toBeDefined();
    expect(prevCollection.assets.length).toBeGreaterThan(0);
    expect(prevCollection.products.length).toBeGreaterThan(0);
    expect(prevCollection.customFields.length).toBeGreaterThan(0);

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: REMOVE_COLLECTION_MUTATION,
        variables: {
          ids: [CollectionConstants.EllieCollection]
        }
      });

    const { removeCollections } = res.body.data;

    expect(removeCollections).toBe(true);

    const afterCollection = await getCollection(testHelper, CollectionConstants.EllieCollection);

    expect(afterCollection.collection).toBeUndefined();
    expect(afterCollection.assets.length).toBe(0);
    expect(afterCollection.products.length).toBe(0);
    expect(afterCollection.translations.length).toBe(0);
    expect(afterCollection.customFields.length).toBe(0);
  });

  test('unlink subCollections for given collection', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: REMOVE_COLLECTION_MUTATION,
        variables: {
          ids: [CollectionConstants.ParentCollection1]
        }
      });

    const { removeCollections } = res.body.data;

    expect(removeCollections).toBe(true);

    const subCollections = await testHelper
      .getQueryBuilder()<CollectionTable>(Tables.Collection)
      .where('parent_id', CollectionConstants.ParentCollection1);

    expect(subCollections).toHaveLength(0);

    const unlinkedSubCollections = await Promise.all([
      getCollection(testHelper, CollectionConstants.EllieCollection),
      getCollection(testHelper, CollectionConstants.TaylorSwiftCollection),
      getCollection(testHelper, CollectionConstants.GamesCollection),
      getCollection(testHelper, CollectionConstants.AlesCollection),
      getCollection(testHelper, CollectionConstants.WosCollection)
    ]);

    expect(unlinkedSubCollections.every(c => !!c?.collection?.id)).toBe(true);
  });

  test('remove multiple collections', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: REMOVE_COLLECTION_MUTATION,
        variables: {
          ids: [
            CollectionConstants.EllieCollection,
            CollectionConstants.JoelCollection,
            CollectionConstants.AlesCollection
          ]
        }
      });

    const { removeCollections } = res.body.data;

    expect(removeCollections).toBe(true);

    const collections = await Promise.all([
      getCollection(testHelper, CollectionConstants.EllieCollection),
      getCollection(testHelper, CollectionConstants.JoelCollection),
      getCollection(testHelper, CollectionConstants.AlesCollection)
    ]);

    expect(collections.every(c => !c.collection)).toBe(true);
    expect(collections.every(c => c.assets.length === 0)).toBe(true);
    expect(collections.every(c => c.products.length === 0)).toBe(true);
    expect(collections.every(c => c.translations.length === 0)).toBe(true);
    expect(collections.every(c => c.customFields.length === 0)).toBe(true);
  });

  test('remove a simple collection', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: REMOVE_COLLECTION_MUTATION,
        variables: {
          ids: [CollectionConstants.JoelCollection]
        }
      });

    const { removeCollections } = res.body.data;

    expect(removeCollections).toBe(true);

    const afterCollection = await getCollection(testHelper, CollectionConstants.JoelCollection);

    expect(afterCollection.collection).toBeUndefined();
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: REMOVE_COLLECTION_MUTATION,
        variables: {
          ids: [CollectionConstants.EllieCollection]
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const REMOVE_COLLECTION_MUTATION = /* GraphQL */ `
  mutation RemoveCollections($ids: [ID!]!) {
    removeCollections(ids: $ids)
  }
`;

const getCollection = async (testHelper: TestUtils, collectionId: ID) => {
  const collection = await testHelper
    .getQueryBuilder()<CollectionTable>(Tables.Collection)
    .where('id', collectionId)
    .first();

  const assets = await testHelper
    .getQueryBuilder()<CollectionAssetTable>(Tables.CollectionAsset)
    .where('collection_id', collectionId);

  const products = await testHelper
    .getQueryBuilder()<CollectionProductTable>(Tables.CollectionProduct)
    .where('collection_id', collectionId);

  const translations = await testHelper
    .getQueryBuilder()<CollectionTranslationTable>(Tables.CollectionTranslation)
    .where('collection_id', collectionId);

  const customFields = await testHelper
    .getQueryBuilder()<CollectionCustomFieldTable>(Tables.CollectionCustomField)
    .where('collection_id', collectionId);

  return {
    collection,
    assets,
    products,
    translations,
    customFields
  };
};
