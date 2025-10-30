import request from 'supertest';

import { Tables } from '@/persistence/tables';
import { VendyxServer } from '@/server';
import { TEST_VENDYX_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { CollectionConstants, CollectionFixtures } from './fixtures/collection.fixtures';
import {
  CollectionTranslationConstants,
  CollectionTranslationFixtures
} from './fixtures/collection-translation.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('createProduct - Mutation', () => {
  const testHelper = new TestHelper();

  const vendyxServer = new VendyxServer(TEST_VENDYX_CONFIG);
  const app = vendyxServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new CollectionFixtures(),
      new CollectionTranslationFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await vendyxServer.teardown();
  });

  test('add full collection translation', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: ADD_COLLECTION_TRANSLATION_MUTATION,
        variables: {
          id: CollectionConstants.EllieCollection,
          input: {
            name: 'Collection name in english',
            description: 'One of the biggest creation of humanity',
            locale: 'en'
          }
        }
      });

    const { addCollectionTranslation } = res.body.data;

    expect(addCollectionTranslation.slug).toBe('collection-name-in-english');
    expect(addCollectionTranslation.name).toBe('Collection name in english');
    expect(addCollectionTranslation.description).toBe('One of the biggest creation of humanity');
  });

  test('add partial product translation', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: ADD_COLLECTION_TRANSLATION_MUTATION,
        variables: {
          id: CollectionConstants.EllieCollection,
          input: {
            description: 'Collection description in english',
            locale: 'es'
          }
        }
      });

    const { addCollectionTranslation } = res.body.data;

    expect(addCollectionTranslation.slug).toBe(null);
    expect(addCollectionTranslation.name).toBe(null);
    expect(addCollectionTranslation.description).toBe('Collection description in english');
  });

  test('sets a null translation', async () => {
    const translation = await testHelper
      .getQueryBuilder()(Tables.CollectionTranslation)
      .where({ collection_id: CollectionConstants.JoelCollection })
      .first();

    console.log({ translation });

    expect(translation.name).toBe(CollectionTranslationConstants.Name);
    expect(translation.slug).toBe(CollectionTranslationConstants.Slug);
    expect(translation.description).toBe(CollectionTranslationConstants.Description);

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: ADD_COLLECTION_TRANSLATION_MUTATION,
        variables: {
          id: CollectionConstants.JoelCollection,
          input: {
            name: null,
            description: null,
            locale: 'es'
          }
        }
      });

    const { addCollectionTranslation } = res.body.data;

    expect(addCollectionTranslation.name).toBe(null);
    expect(addCollectionTranslation.description).toBe(null);
    expect(addCollectionTranslation.slug).toBe(CollectionTranslationConstants.Slug);
  });
});

const ADD_COLLECTION_TRANSLATION_MUTATION = /* GraphQL */ `
  mutation AddCollectionTranslationMutation($id: ID!, $input: CollectionTranslationInput!) {
    addCollectionTranslation(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      name
      slug
      description
    }
  }
`;
