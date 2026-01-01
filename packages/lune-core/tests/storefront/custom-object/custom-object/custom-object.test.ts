import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import {
  CustomFieldDefinitionConstants,
  CustomFieldDefinitionFixtures
} from './fixtures/custom-field-definition.fixtures';
import { CustomObjectDefinitionFixtures } from './fixtures/custom-object-definition.fixtures';
import {
  CustomObjectEntryConstants,
  CustomObjectEntryFixtures
} from './fixtures/custom-object-entry.fixtures';
import {
  CustomObjectEntryValueConstants,
  CustomObjectEntryValueFixtures
} from './fixtures/custom-object-entry-value.fixtures';
import {
  CustomObjectEntryValueTranslationConstants,
  CustomObjectEntryValueTranslationFixtures
} from './fixtures/custom-object-entry-value-translation.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';

describe('customObject - Query', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new CustomObjectDefinitionFixtures(),
      new CustomFieldDefinitionFixtures(),
      new CustomObjectEntryFixtures(),
      new CustomObjectEntryValueFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('returns custom object by id', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_CUSTOM_OBJECT_QUERY,
        variables: {
          id: CustomObjectEntryConstants.FirstEntryID,
          keys: [
            CustomFieldDefinitionConstants.TitleFieldKey,
            CustomFieldDefinitionConstants.ContentFieldKey,
            CustomFieldDefinitionConstants.AuthorFieldKey
          ]
        }
      });

    const { customObject } = res.body.data;

    expect(customObject.id).toBe(CustomObjectEntryConstants.FirstEntryID);
    expect(customObject.slug).toBe(CustomObjectEntryConstants.FirstEntrySlug);
    expect(customObject.fields).toHaveLength(3);
    expect(customObject.fields[0].key).toBe(CustomFieldDefinitionConstants.TitleFieldKey);
    expect(customObject.fields[0].value).toBe(CustomObjectEntryValueConstants.FirstEntryTitleValue);
    expect(customObject.fields[1].key).toBe(CustomFieldDefinitionConstants.ContentFieldKey);
    expect(customObject.fields[1].value).toBe(
      CustomObjectEntryValueConstants.FirstEntryContentValue
    );
    expect(customObject.fields[2].key).toBe(CustomFieldDefinitionConstants.AuthorFieldKey);
    expect(customObject.fields[2].value).toBe(
      CustomObjectEntryValueConstants.FirstEntryAuthorValue
    );
  });

  test('returns custom object by slug', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_CUSTOM_OBJECT_QUERY,
        variables: {
          slug: CustomObjectEntryConstants.SecondEntrySlug,
          keys: []
        }
      });

    const { customObject } = res.body.data;

    expect(customObject.id).toBe(CustomObjectEntryConstants.SecondEntryID);
    expect(customObject.slug).toBe(CustomObjectEntryConstants.SecondEntrySlug);
  });

  test('returns fields filtered by keys', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_CUSTOM_OBJECT_QUERY,
        variables: {
          id: CustomObjectEntryConstants.FirstEntryID,
          keys: [CustomFieldDefinitionConstants.TitleFieldKey]
        }
      });

    const { customObject } = res.body.data;

    expect(customObject.fields).toHaveLength(1);
    expect(customObject.fields[0].key).toBe(CustomFieldDefinitionConstants.TitleFieldKey);
    expect(customObject.fields[0].value).toBe(CustomObjectEntryValueConstants.FirstEntryTitleValue);
  });

  test('returns null when custom object does not exist (id)', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_CUSTOM_OBJECT_QUERY,
        variables: {
          id: TestUtils.generateUUID(),
          keys: []
        }
      });

    const { customObject } = res.body.data;

    expect(customObject).toBe(null);
  });

  test('returns null when custom object does not exist (slug)', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_CUSTOM_OBJECT_QUERY,
        variables: {
          slug: 'non-existent-slug',
          keys: []
        }
      });

    const { customObject } = res.body.data;

    expect(customObject).toBe(null);
  });

  test('returns translated field value when locale is provided', async () => {
    await testHelper.loadFixtures([new CustomObjectEntryValueTranslationFixtures()]);

    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_lune_storefront_locale', CustomObjectEntryValueTranslationConstants.Locale)
      .send({
        query: GET_CUSTOM_OBJECT_QUERY,
        variables: {
          id: CustomObjectEntryConstants.FirstEntryID,
          keys: [CustomFieldDefinitionConstants.TranslatableFieldKey]
        }
      });

    const { customObject } = res.body.data;

    expect(customObject.fields).toHaveLength(1);
    expect(customObject.fields[0].key).toBe(CustomFieldDefinitionConstants.TranslatableFieldKey);
    expect(customObject.fields[0].value).toBe(
      CustomObjectEntryValueTranslationConstants.TranslatedValue
    );
  });

  test('returns original field value when no translation exists for locale', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_lune_storefront_locale', 'fr')
      .send({
        query: GET_CUSTOM_OBJECT_QUERY,
        variables: {
          id: CustomObjectEntryConstants.FirstEntryID,
          keys: [CustomFieldDefinitionConstants.TranslatableFieldKey]
        }
      });

    const { customObject } = res.body.data;

    expect(customObject.fields).toHaveLength(1);
    expect(customObject.fields[0].value).toBe(
      CustomObjectEntryValueConstants.FirstEntryTranslatableValue
    );
  });

  test('returns UNAUTHORIZED error when storefront api key is invalid', async () => {
    const response = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', 'invalid_key')
      .send({
        query: GET_CUSTOM_OBJECT_QUERY,
        variables: {
          id: CustomObjectEntryConstants.FirstEntryID,
          keys: []
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });

  test('returns UNAUTHORIZED error when no shop id is provided', async () => {
    const response = await request(app)
      .post('/storefront-api')
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_CUSTOM_OBJECT_QUERY,
        variables: {
          id: CustomObjectEntryConstants.FirstEntryID,
          keys: []
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const GET_CUSTOM_OBJECT_QUERY = /* GraphQL */ `
  query CustomObject($id: ID, $slug: String, $keys: [String!]!) {
    customObject(id: $id, slug: $slug) {
      id
      slug
      fields(keys: $keys) {
        key
        value
        type
      }
    }
  }
`;
