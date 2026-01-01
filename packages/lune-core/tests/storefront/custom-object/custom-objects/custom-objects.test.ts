import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import {
  CustomObjectDefinitionConstants,
  CustomObjectDefinitionFixtures
} from './fixtures/custom-object-definition.fixtures';
import {
  CustomObjectEntryConstants,
  CustomObjectEntryFixtures
} from './fixtures/custom-object-entry.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';

describe('customObjects - Query', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new CustomObjectDefinitionFixtures(),
      new CustomObjectEntryFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('returns custom objects by definition key', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_CUSTOM_OBJECTS_QUERY,
        variables: {
          definitionKey: CustomObjectDefinitionConstants.Key
        }
      });

    const { customObjects } = res.body.data;

    expect(customObjects.count).toBe(2);
    expect(customObjects.pageInfo.total).toBe(2);
    expect(customObjects.items).toHaveLength(2);
    expect(customObjects.items[0].id).toBe(CustomObjectEntryConstants.FirstEntryID);
    expect(customObjects.items[1].id).toBe(CustomObjectEntryConstants.SecondEntryID);
  });

  test('returns empty list when definition key does not exist', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_CUSTOM_OBJECTS_QUERY,
        variables: {
          definitionKey: 'non-existent-key'
        }
      });

    const { customObjects } = res.body.data;

    expect(customObjects.count).toBe(0);
    expect(customObjects.pageInfo.total).toBe(0);
    expect(customObjects.items).toHaveLength(0);
  });

  test('returns custom objects with pagination (take)', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_CUSTOM_OBJECTS_QUERY,
        variables: {
          definitionKey: CustomObjectDefinitionConstants.Key,
          input: { take: 1 }
        }
      });

    const { customObjects } = res.body.data;

    expect(customObjects.count).toBe(1);
    expect(customObjects.pageInfo.total).toBe(2);
    expect(customObjects.items).toHaveLength(1);
    expect(customObjects.items[0].id).toBe(CustomObjectEntryConstants.FirstEntryID);
  });

  test('returns custom objects with pagination (skip)', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_CUSTOM_OBJECTS_QUERY,
        variables: {
          definitionKey: CustomObjectDefinitionConstants.Key,
          input: { skip: 1 }
        }
      });

    const { customObjects } = res.body.data;

    expect(customObjects.count).toBe(1);
    expect(customObjects.pageInfo.total).toBe(2);
    expect(customObjects.items).toHaveLength(1);
    expect(customObjects.items[0].id).toBe(CustomObjectEntryConstants.SecondEntryID);
  });

  test('returns UNAUTHORIZED error when storefront api key is invalid', async () => {
    const response = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', 'invalid_key')
      .send({
        query: GET_CUSTOM_OBJECTS_QUERY,
        variables: {
          definitionKey: CustomObjectDefinitionConstants.Key
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });

  test('returns UNAUTHORIZED error when no shop id is provided', async () => {
    const response = await request(app)
      .post('/storefront-api')
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_CUSTOM_OBJECTS_QUERY,
        variables: {
          definitionKey: CustomObjectDefinitionConstants.Key
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const GET_CUSTOM_OBJECTS_QUERY = /* GraphQL */ `
  query CustomObjects($definitionKey: String!, $input: ListInput) {
    customObjects(definitionKey: $definitionKey, input: $input) {
      count
      pageInfo {
        total
      }
      items {
        id
        slug
      }
    }
  }
`;
