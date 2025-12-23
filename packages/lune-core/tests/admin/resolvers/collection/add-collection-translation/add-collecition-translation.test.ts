import request from 'supertest';

import { Tables } from '@/persistence/tables';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { CollectionConstants, CollectionFixtures } from './fixtures/collection.fixtures';
import {
  CollectionCustomFieldConstants,
  CollectionCustomFieldFixtures
} from './fixtures/collection-custom-field.fixtures';
import {
  CollectionCustomFieldTranslationConstants,
  CollectionCustomFieldTranslationFixtures
} from './fixtures/collection-custom-field-translation.fixtures';
import {
  CollectionTranslationConstants,
  CollectionTranslationFixtures
} from './fixtures/collection-translation.fixtures';
import { CustomFieldDefinitionFixtures } from './fixtures/custom-field-definition.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('addCollectionTranslation - Mutation', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new CollectionFixtures(),
      new CollectionTranslationFixtures(),
      new CustomFieldDefinitionFixtures(),
      new CollectionCustomFieldFixtures(),
      new CollectionCustomFieldTranslationFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('add full collection translation', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
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
      .set('x_lune_shop_id', ShopConstants.ID)
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

    expect(translation.name).toBe(CollectionTranslationConstants.Name);
    expect(translation.slug).toBe(CollectionTranslationConstants.Slug);
    expect(translation.description).toBe(CollectionTranslationConstants.Description);

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
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

  test('add new custom field translation', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ADD_COLLECTION_TRANSLATION_MUTATION,
        variables: {
          id: CollectionConstants.EllieCollection,
          input: {
            locale: 'es',
            customFields: [
              { id: CollectionCustomFieldConstants.BannerTextFieldID, value: 'Venta de Verano' },
              {
                id: CollectionCustomFieldConstants.PromotionLabelFieldID,
                value: '50% de descuento'
              }
            ]
          }
        }
      });

    const { addCollectionTranslation } = res.body.data;

    expect(addCollectionTranslation).toBeDefined();

    const collectionRes = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS_QUERY,
        variables: { id: CollectionConstants.EllieCollection }
      });

    const { collection } = collectionRes.body.data;
    const bannerField = collection.customFieldEntries.find(
      (cf: { id: string }) => cf.id === CollectionCustomFieldConstants.BannerTextFieldID
    );
    const promoField = collection.customFieldEntries.find(
      (cf: { id: string }) => cf.id === CollectionCustomFieldConstants.PromotionLabelFieldID
    );

    expect(bannerField.translations).toHaveLength(1);
    expect(bannerField.translations[0].value).toBe('Venta de Verano');
    expect(bannerField.translations[0].locale).toBe('es');

    expect(promoField.translations).toHaveLength(1);
    expect(promoField.translations[0].value).toBe('50% de descuento');
    expect(promoField.translations[0].locale).toBe('es');
  });

  test('update custom field translation', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ADD_COLLECTION_TRANSLATION_MUTATION,
        variables: {
          id: CollectionConstants.JoelCollection,
          input: {
            locale: 'es',
            name: 'test',
            customFields: [
              {
                id: CollectionCustomFieldConstants.AlreadyTranslatedBannerTextFieldID,
                value: 'Nueva traducción de invierno'
              }
            ]
          }
        }
      });

    const { addCollectionTranslation } = res.body.data;

    expect(addCollectionTranslation).toBeDefined();

    const collectionRes = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS_QUERY,
        variables: { id: CollectionConstants.JoelCollection }
      });

    const { collection } = collectionRes.body.data;
    const bannerField = collection.customFieldEntries.find(
      (cf: { id: string }) =>
        cf.id === CollectionCustomFieldConstants.AlreadyTranslatedBannerTextFieldID
    );

    expect(bannerField.translations).toHaveLength(1);
    expect(bannerField.translations[0].value).toBe('Nueva traducción de invierno');
  });

  test('set null custom field translation', async () => {
    // Verify initial translation value via GraphQL
    const initialRes = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS_QUERY,
        variables: { id: CollectionConstants.JoelCollection }
      });

    const initialCollection = initialRes.body.data.collection;
    const initialBannerField = initialCollection.customFieldEntries.find(
      (cf: { id: string }) =>
        cf.id === CollectionCustomFieldConstants.AlreadyTranslatedBannerTextFieldID
    );

    expect(initialBannerField.translations[0].value).toBe(
      CollectionCustomFieldTranslationConstants.AlreadyTranslatedBannerTextValue
    );

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ADD_COLLECTION_TRANSLATION_MUTATION,
        variables: {
          id: CollectionConstants.JoelCollection,
          input: {
            locale: 'es',
            name: 'test',
            customFields: [
              {
                id: CollectionCustomFieldConstants.AlreadyTranslatedBannerTextFieldID,
                value: null
              }
            ]
          }
        }
      });

    const { addCollectionTranslation } = res.body.data;

    expect(addCollectionTranslation).toBeDefined();

    const collectionRes = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS_QUERY,
        variables: { id: CollectionConstants.JoelCollection }
      });

    const { collection } = collectionRes.body.data;
    const bannerField = collection.customFieldEntries.find(
      (cf: { id: string }) =>
        cf.id === CollectionCustomFieldConstants.AlreadyTranslatedBannerTextFieldID
    );

    expect(bannerField.translations).toHaveLength(1);
    expect(bannerField.translations[0].value).toBe(null);
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

const GET_COLLECTION_WITH_CUSTOM_FIELDS_QUERY = /* GraphQL */ `
  query GetCollection($id: ID!) {
    collection(id: $id) {
      id
      customFieldEntries {
        id
        value
        translations {
          id
          value
          locale
        }
      }
    }
  }
`;
