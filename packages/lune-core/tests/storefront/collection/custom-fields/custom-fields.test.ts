import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { CollectionConstants, CollectionFixtures } from './fixtures/collection.fixtures';
import {
  CollectionCustomFieldConstants,
  CollectionCustomFieldFixtures
} from './fixtures/collection-custom-field.fixtures';
import { CustomFieldDefinitionConstants } from './fixtures/custom-field-definition.fixtures';
import { CustomFieldDefinitionFixtures } from './fixtures/custom-field-definition.fixtures';
import { ProductConstants, ProductFixtures } from './fixtures/product.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';

const ALL_KEYS = [
  CustomFieldDefinitionConstants.SingleLineTextKey,
  CustomFieldDefinitionConstants.MultiLineTextKey,
  CustomFieldDefinitionConstants.UrlKey,
  CustomFieldDefinitionConstants.ColorKey,
  CustomFieldDefinitionConstants.IntegerKey,
  CustomFieldDefinitionConstants.DecimalKey,
  CustomFieldDefinitionConstants.MoneyKey,
  CustomFieldDefinitionConstants.DateKey,
  CustomFieldDefinitionConstants.BooleanKey,
  CustomFieldDefinitionConstants.ImageKey,
  CustomFieldDefinitionConstants.ProductReferenceKey,
  CustomFieldDefinitionConstants.CollectionReferenceKey,
  CustomFieldDefinitionConstants.IntegerListKey,
  CustomFieldDefinitionConstants.ProductReferenceListKey,
  CustomFieldDefinitionConstants.CollectionReferenceListKey
];

describe('Collection.customFields - Query', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new ProductFixtures(),
      new CollectionFixtures(),
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

  test('returns all custom fields for a collection', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS,
        variables: {
          id: CollectionConstants.ID,
          keys: ALL_KEYS
        }
      });

    const { collection } = res.body.data;

    expect(collection.customFields).toHaveLength(15);
  });

  test('returns single line text custom field correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS,
        variables: {
          id: CollectionConstants.ID,
          keys: [CustomFieldDefinitionConstants.SingleLineTextKey]
        }
      });

    const { collection } = res.body.data;

    expect(collection.customFields).toHaveLength(1);
    expect(collection.customFields[0].key).toBe(CustomFieldDefinitionConstants.SingleLineTextKey);
    expect(collection.customFields[0].value).toBe(
      CollectionCustomFieldConstants.SingleLineTextValue
    );
    expect(collection.customFields[0].type).toBe('SINGLE_LINE_TEXT');
    expect(collection.customFields[0].isList).toBe(false);
  });

  test('returns multi line text custom field correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS,
        variables: {
          id: CollectionConstants.ID,
          keys: [CustomFieldDefinitionConstants.MultiLineTextKey]
        }
      });

    const { collection } = res.body.data;

    expect(collection.customFields).toHaveLength(1);
    expect(collection.customFields[0].value).toBe(
      CollectionCustomFieldConstants.MultiLineTextValue
    );
    expect(collection.customFields[0].type).toBe('MULTI_LINE_TEXT');
    expect(collection.customFields[0].isList).toBe(false);
  });

  test('returns url custom field correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS,
        variables: {
          id: CollectionConstants.ID,
          keys: [CustomFieldDefinitionConstants.UrlKey]
        }
      });

    const { collection } = res.body.data;

    expect(collection.customFields).toHaveLength(1);
    expect(collection.customFields[0].value).toBe(CollectionCustomFieldConstants.UrlValue);
    expect(collection.customFields[0].type).toBe('URL');
    expect(collection.customFields[0].isList).toBe(false);
  });

  test('returns color custom field correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS,
        variables: {
          id: CollectionConstants.ID,
          keys: [CustomFieldDefinitionConstants.ColorKey]
        }
      });

    const { collection } = res.body.data;

    expect(collection.customFields).toHaveLength(1);
    expect(collection.customFields[0].value).toBe(CollectionCustomFieldConstants.ColorValue);
    expect(collection.customFields[0].type).toBe('COLOR');
    expect(collection.customFields[0].isList).toBe(false);
  });

  test('returns integer custom field correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS,
        variables: {
          id: CollectionConstants.ID,
          keys: [CustomFieldDefinitionConstants.IntegerKey]
        }
      });

    const { collection } = res.body.data;

    expect(collection.customFields).toHaveLength(1);
    expect(collection.customFields[0].value).toBe(CollectionCustomFieldConstants.IntegerValue);
    expect(collection.customFields[0].type).toBe('INTEGER');
    expect(collection.customFields[0].isList).toBe(false);
  });

  test('returns decimal custom field correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS,
        variables: {
          id: CollectionConstants.ID,
          keys: [CustomFieldDefinitionConstants.DecimalKey]
        }
      });

    const { collection } = res.body.data;

    expect(collection.customFields).toHaveLength(1);
    expect(collection.customFields[0].value).toBe(CollectionCustomFieldConstants.DecimalValue);
    expect(collection.customFields[0].type).toBe('DECIMAL');
    expect(collection.customFields[0].isList).toBe(false);
  });

  test('returns money custom field correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS,
        variables: {
          id: CollectionConstants.ID,
          keys: [CustomFieldDefinitionConstants.MoneyKey]
        }
      });

    const { collection } = res.body.data;

    expect(collection.customFields).toHaveLength(1);
    expect(collection.customFields[0].value).toBe(CollectionCustomFieldConstants.MoneyValue);
    expect(collection.customFields[0].type).toBe('MONEY');
    expect(collection.customFields[0].isList).toBe(false);
  });

  test('returns date custom field correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS,
        variables: {
          id: CollectionConstants.ID,
          keys: [CustomFieldDefinitionConstants.DateKey]
        }
      });

    const { collection } = res.body.data;

    expect(collection.customFields).toHaveLength(1);
    expect(collection.customFields[0].value).toBe(CollectionCustomFieldConstants.DateValue);
    expect(collection.customFields[0].type).toBe('DATE');
    expect(collection.customFields[0].isList).toBe(false);
  });

  test('returns boolean custom field correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS,
        variables: {
          id: CollectionConstants.ID,
          keys: [CustomFieldDefinitionConstants.BooleanKey]
        }
      });

    const { collection } = res.body.data;

    expect(collection.customFields).toHaveLength(1);
    expect(collection.customFields[0].value).toBe(CollectionCustomFieldConstants.BooleanValue);
    expect(collection.customFields[0].type).toBe('BOOLEAN');
    expect(collection.customFields[0].isList).toBe(false);
  });

  test('returns image custom field correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS,
        variables: {
          id: CollectionConstants.ID,
          keys: [CustomFieldDefinitionConstants.ImageKey]
        }
      });

    const { collection } = res.body.data;

    expect(collection.customFields).toHaveLength(1);
    expect(collection.customFields[0].value).toBe(CollectionCustomFieldConstants.ImageValue);
    expect(collection.customFields[0].type).toBe('IMAGE');
    expect(collection.customFields[0].isList).toBe(false);
  });

  test('returns product reference custom field correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS,
        variables: {
          id: CollectionConstants.ID,
          keys: [CustomFieldDefinitionConstants.ProductReferenceKey]
        }
      });

    const { collection } = res.body.data;

    expect(collection.customFields).toHaveLength(1);
    expect(collection.customFields[0].value).toBe(
      CollectionCustomFieldConstants.ProductReferenceValue
    );
    expect(collection.customFields[0].type).toBe('PRODUCT_REFERENCE');
    expect(collection.customFields[0].isList).toBe(false);
  });

  test('returns collection reference custom field correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS,
        variables: {
          id: CollectionConstants.ID,
          keys: [CustomFieldDefinitionConstants.CollectionReferenceKey]
        }
      });

    const { collection } = res.body.data;

    expect(collection.customFields).toHaveLength(1);
    expect(collection.customFields[0].value).toBe(
      CollectionCustomFieldConstants.CollectionReferenceValue
    );
    expect(collection.customFields[0].type).toBe('COLLECTION_REFERENCE');
    expect(collection.customFields[0].isList).toBe(false);
  });

  test('returns list custom field correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS,
        variables: {
          id: CollectionConstants.ID,
          keys: [CustomFieldDefinitionConstants.IntegerListKey]
        }
      });

    const { collection } = res.body.data;

    expect(collection.customFields).toHaveLength(1);
    expect(collection.customFields[0].value).toEqual(
      CollectionCustomFieldConstants.IntegerListValue
    );
    expect(collection.customFields[0].type).toBe('INTEGER');
    expect(collection.customFields[0].isList).toBe(true);
  });

  test('returns custom fields ordered by definition order', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS,
        variables: {
          id: CollectionConstants.ID,
          keys: ALL_KEYS
        }
      });

    const { collection } = res.body.data;
    const keys = collection.customFields.map(f => f.key);

    expect(keys).toEqual(ALL_KEYS);
  });

  test('returns empty array when collection has no custom fields', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS,
        variables: {
          id: CollectionConstants.WithoutFieldsID,
          keys: ALL_KEYS
        }
      });

    const { collection } = res.body.data;

    expect(collection.customFields).toEqual([]);
  });

  test('returns only requested keys', async () => {
    const requestedKeys = [
      CustomFieldDefinitionConstants.SingleLineTextKey,
      CustomFieldDefinitionConstants.IntegerKey,
      CustomFieldDefinitionConstants.BooleanKey
    ];

    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS,
        variables: {
          id: CollectionConstants.ID,
          keys: requestedKeys
        }
      });

    const { collection } = res.body.data;

    expect(collection.customFields).toHaveLength(3);
    expect(collection.customFields.map(f => f.key)).toEqual(requestedKeys);
  });

  test('returns product references correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS_AND_REFERENCES,
        variables: {
          id: CollectionConstants.ID,
          keys: [CustomFieldDefinitionConstants.ProductReferenceKey]
        }
      });

    const { collection } = res.body.data;

    expect(collection.customFields).toHaveLength(1);
    expect(collection.customFields[0].type).toBe('PRODUCT_REFERENCE');
    expect(collection.customFields[0].references.count).toBe(1);
    expect(collection.customFields[0].references.pageInfo.total).toBe(1);
    expect(collection.customFields[0].references.items).toHaveLength(1);
    expect(collection.customFields[0].references.items[0]).toEqual({
      __typename: 'Product',
      id: ProductConstants.ReferencedProductID,
      name: ProductConstants.ReferencedProductName,
      slug: ProductConstants.ReferencedProductSlug
    });
  });

  test('returns collection references correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS_AND_REFERENCES,
        variables: {
          id: CollectionConstants.ID,
          keys: [CustomFieldDefinitionConstants.CollectionReferenceKey]
        }
      });

    const { collection } = res.body.data;

    expect(collection.customFields).toHaveLength(1);
    expect(collection.customFields[0].type).toBe('COLLECTION_REFERENCE');
    expect(collection.customFields[0].references.count).toBe(1);
    expect(collection.customFields[0].references.pageInfo.total).toBe(1);
    expect(collection.customFields[0].references.items).toHaveLength(1);
    expect(collection.customFields[0].references.items[0]).toEqual({
      __typename: 'Collection',
      id: CollectionConstants.ReferencedCollectionID,
      name: CollectionConstants.ReferencedCollectionName,
      slug: CollectionConstants.ReferencedCollectionSlug
    });
  });

  test('returns empty references for non-reference field types', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS_AND_REFERENCES,
        variables: {
          id: CollectionConstants.ID,
          keys: [CustomFieldDefinitionConstants.SingleLineTextKey]
        }
      });

    const { collection } = res.body.data;

    expect(collection.customFields).toHaveLength(1);
    expect(collection.customFields[0].type).toBe('SINGLE_LINE_TEXT');
    expect(collection.customFields[0].references.count).toBe(0);
    expect(collection.customFields[0].references.items).toEqual([]);
    expect(collection.customFields[0].references.pageInfo.total).toBe(0);
  });

  test('returns all product references in a list field', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS_AND_REFERENCES,
        variables: {
          id: CollectionConstants.ID,
          keys: [CustomFieldDefinitionConstants.ProductReferenceListKey]
        }
      });

    const { collection } = res.body.data;

    expect(collection.customFields).toHaveLength(1);
    expect(collection.customFields[0].type).toBe('PRODUCT_REFERENCE');
    expect(collection.customFields[0].isList).toBe(true);
    expect(collection.customFields[0].references.count).toBe(3);
    expect(collection.customFields[0].references.pageInfo.total).toBe(3);
    expect(collection.customFields[0].references.items).toHaveLength(3);
    expect(collection.customFields[0].references.items[0].id).toBe(
      ProductConstants.ReferencedProductID
    );
    expect(collection.customFields[0].references.items[1].id).toBe(
      ProductConstants.ReferencedProduct2ID
    );
    expect(collection.customFields[0].references.items[2].id).toBe(
      ProductConstants.ReferencedProduct3ID
    );
  });

  test('paginates product references with skip and take', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS_AND_REFERENCES,
        variables: {
          id: CollectionConstants.ID,
          keys: [CustomFieldDefinitionConstants.ProductReferenceListKey],
          referencesInput: { skip: 1, take: 1 }
        }
      });

    const { collection } = res.body.data;

    expect(collection.customFields).toHaveLength(1);
    expect(collection.customFields[0].references.count).toBe(1);
    expect(collection.customFields[0].references.pageInfo.total).toBe(3);
    expect(collection.customFields[0].references.items).toHaveLength(1);
    expect(collection.customFields[0].references.items[0].id).toBe(
      ProductConstants.ReferencedProduct2ID
    );
  });

  test('paginates collection references with skip and take', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS_AND_REFERENCES,
        variables: {
          id: CollectionConstants.ID,
          keys: [CustomFieldDefinitionConstants.CollectionReferenceListKey],
          referencesInput: { skip: 0, take: 2 }
        }
      });

    const { collection } = res.body.data;

    expect(collection.customFields).toHaveLength(1);
    expect(collection.customFields[0].references.count).toBe(2);
    expect(collection.customFields[0].references.pageInfo.total).toBe(3);
    expect(collection.customFields[0].references.items).toHaveLength(2);
    expect(collection.customFields[0].references.items[0].id).toBe(
      CollectionConstants.ReferencedCollectionID
    );
    expect(collection.customFields[0].references.items[1].id).toBe(
      CollectionConstants.ReferencedCollection2ID
    );
  });

  test('returns empty items when skip exceeds total references', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_COLLECTION_WITH_CUSTOM_FIELDS_AND_REFERENCES,
        variables: {
          id: CollectionConstants.ID,
          keys: [CustomFieldDefinitionConstants.ProductReferenceListKey],
          referencesInput: { skip: 10, take: 5 }
        }
      });

    const { collection } = res.body.data;

    expect(collection.customFields).toHaveLength(1);
    expect(collection.customFields[0].references.count).toBe(0);
    expect(collection.customFields[0].references.pageInfo.total).toBe(3);
    expect(collection.customFields[0].references.items).toHaveLength(0);
  });
});

const GET_COLLECTION_WITH_CUSTOM_FIELDS = /* GraphQL */ `
  query Collection($id: ID!, $keys: [String!]!) {
    collection(id: $id) {
      id
      name
      customFields(keys: $keys) {
        key
        value
        type
        isList
      }
    }
  }
`;

const GET_COLLECTION_WITH_CUSTOM_FIELDS_AND_REFERENCES = /* GraphQL */ `
  query Collection($id: ID!, $keys: [String!]!, $referencesInput: ListInput) {
    collection(id: $id) {
      id
      name
      customFields(keys: $keys) {
        key
        value
        type
        isList
        references(input: $referencesInput) {
          count
          items {
            __typename
            ... on Product {
              id
              name
              slug
            }
            ... on Collection {
              id
              name
              slug
            }
          }
          pageInfo {
            total
          }
        }
      }
    }
  }
`;
