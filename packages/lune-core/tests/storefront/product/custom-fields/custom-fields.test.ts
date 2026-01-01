import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { CollectionConstants, CollectionFixtures } from './fixtures/collection.fixtures';
import { CustomFieldDefinitionConstants } from './fixtures/custom-field-definition.fixtures';
import { CustomFieldDefinitionFixtures } from './fixtures/custom-field-definition.fixtures';
import { CustomObjectDefinitionFixtures } from './fixtures/custom-object-definition.fixtures';
import {
  CustomObjectEntryConstants,
  CustomObjectEntryFixtures
} from './fixtures/custom-object-entry.fixtures';
import { ProductConstants, ProductFixtures } from './fixtures/product.fixtures';
import {
  ProductCustomFieldConstants,
  ProductCustomFieldFixtures
} from './fixtures/product-custom-field.fixtures';
import {
  ProductCustomFieldTranslationConstants,
  ProductCustomFieldTranslationFixtures
} from './fixtures/product-custom-field-translation.fixtures';
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
  CustomFieldDefinitionConstants.CollectionReferenceListKey,
  CustomFieldDefinitionConstants.CustomObjectReferenceKey,
  CustomFieldDefinitionConstants.CustomObjectReferenceListKey
];

describe('Product.customFields - Query', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new ProductFixtures(),
      new CollectionFixtures(),
      new CustomObjectDefinitionFixtures(),
      new CustomObjectEntryFixtures(),
      new CustomFieldDefinitionFixtures(),
      new ProductCustomFieldFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('returns all custom fields for a product', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_PRODUCT_WITH_CUSTOM_FIELDS,
        variables: {
          id: ProductConstants.ID,
          keys: ALL_KEYS
        }
      });

    const { product } = res.body.data;

    expect(product.customFields).toHaveLength(17);
  });

  test('returns single line text custom field correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_PRODUCT_WITH_CUSTOM_FIELDS,
        variables: {
          id: ProductConstants.ID,
          keys: [CustomFieldDefinitionConstants.SingleLineTextKey]
        }
      });

    const { product } = res.body.data;

    expect(product.customFields).toHaveLength(1);
    expect(product.customFields[0].key).toBe(CustomFieldDefinitionConstants.SingleLineTextKey);
    expect(product.customFields[0].value).toBe(ProductCustomFieldConstants.SingleLineTextValue);
    expect(product.customFields[0].type).toBe('SINGLE_LINE_TEXT');
    expect(product.customFields[0].isList).toBe(false);
  });

  test('returns multi line text custom field correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_PRODUCT_WITH_CUSTOM_FIELDS,
        variables: {
          id: ProductConstants.ID,
          keys: [CustomFieldDefinitionConstants.MultiLineTextKey]
        }
      });

    const { product } = res.body.data;

    expect(product.customFields).toHaveLength(1);
    expect(product.customFields[0].value).toBe(ProductCustomFieldConstants.MultiLineTextValue);
    expect(product.customFields[0].type).toBe('MULTI_LINE_TEXT');
    expect(product.customFields[0].isList).toBe(false);
  });

  test('returns url custom field correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_PRODUCT_WITH_CUSTOM_FIELDS,
        variables: {
          id: ProductConstants.ID,
          keys: [CustomFieldDefinitionConstants.UrlKey]
        }
      });

    const { product } = res.body.data;

    expect(product.customFields).toHaveLength(1);
    expect(product.customFields[0].value).toBe(ProductCustomFieldConstants.UrlValue);
    expect(product.customFields[0].type).toBe('URL');
    expect(product.customFields[0].isList).toBe(false);
  });

  test('returns color custom field correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_PRODUCT_WITH_CUSTOM_FIELDS,
        variables: {
          id: ProductConstants.ID,
          keys: [CustomFieldDefinitionConstants.ColorKey]
        }
      });

    const { product } = res.body.data;

    expect(product.customFields).toHaveLength(1);
    expect(product.customFields[0].value).toBe(ProductCustomFieldConstants.ColorValue);
    expect(product.customFields[0].type).toBe('COLOR');
    expect(product.customFields[0].isList).toBe(false);
  });

  test('returns integer custom field correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_PRODUCT_WITH_CUSTOM_FIELDS,
        variables: {
          id: ProductConstants.ID,
          keys: [CustomFieldDefinitionConstants.IntegerKey]
        }
      });

    const { product } = res.body.data;

    expect(product.customFields).toHaveLength(1);
    expect(product.customFields[0].value).toBe(ProductCustomFieldConstants.IntegerValue);
    expect(product.customFields[0].type).toBe('INTEGER');
    expect(product.customFields[0].isList).toBe(false);
  });

  test('returns decimal custom field correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_PRODUCT_WITH_CUSTOM_FIELDS,
        variables: {
          id: ProductConstants.ID,
          keys: [CustomFieldDefinitionConstants.DecimalKey]
        }
      });

    const { product } = res.body.data;

    expect(product.customFields).toHaveLength(1);
    expect(product.customFields[0].value).toBe(ProductCustomFieldConstants.DecimalValue);
    expect(product.customFields[0].type).toBe('DECIMAL');
    expect(product.customFields[0].isList).toBe(false);
  });

  test('returns money custom field correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_PRODUCT_WITH_CUSTOM_FIELDS,
        variables: {
          id: ProductConstants.ID,
          keys: [CustomFieldDefinitionConstants.MoneyKey]
        }
      });

    const { product } = res.body.data;

    expect(product.customFields).toHaveLength(1);
    expect(product.customFields[0].value).toBe(ProductCustomFieldConstants.MoneyValue);
    expect(product.customFields[0].type).toBe('MONEY');
    expect(product.customFields[0].isList).toBe(false);
  });

  test('returns date custom field correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_PRODUCT_WITH_CUSTOM_FIELDS,
        variables: {
          id: ProductConstants.ID,
          keys: [CustomFieldDefinitionConstants.DateKey]
        }
      });

    const { product } = res.body.data;

    expect(product.customFields).toHaveLength(1);
    expect(product.customFields[0].value).toBe(ProductCustomFieldConstants.DateValue);
    expect(product.customFields[0].type).toBe('DATE');
    expect(product.customFields[0].isList).toBe(false);
  });

  test('returns boolean custom field correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_PRODUCT_WITH_CUSTOM_FIELDS,
        variables: {
          id: ProductConstants.ID,
          keys: [CustomFieldDefinitionConstants.BooleanKey]
        }
      });

    const { product } = res.body.data;

    expect(product.customFields).toHaveLength(1);
    expect(product.customFields[0].value).toBe(ProductCustomFieldConstants.BooleanValue);
    expect(product.customFields[0].type).toBe('BOOLEAN');
    expect(product.customFields[0].isList).toBe(false);
  });

  test('returns image custom field correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_PRODUCT_WITH_CUSTOM_FIELDS,
        variables: {
          id: ProductConstants.ID,
          keys: [CustomFieldDefinitionConstants.ImageKey]
        }
      });

    const { product } = res.body.data;

    expect(product.customFields).toHaveLength(1);
    expect(product.customFields[0].value).toBe(ProductCustomFieldConstants.ImageValue);
    expect(product.customFields[0].type).toBe('IMAGE');
    expect(product.customFields[0].isList).toBe(false);
  });

  test('returns product reference custom field correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_PRODUCT_WITH_CUSTOM_FIELDS,
        variables: {
          id: ProductConstants.ID,
          keys: [CustomFieldDefinitionConstants.ProductReferenceKey]
        }
      });

    const { product } = res.body.data;

    expect(product.customFields).toHaveLength(1);
    expect(product.customFields[0].value).toBe(ProductCustomFieldConstants.ProductReferenceValue);
    expect(product.customFields[0].type).toBe('PRODUCT_REFERENCE');
    expect(product.customFields[0].isList).toBe(false);
  });

  test('returns collection reference custom field correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_PRODUCT_WITH_CUSTOM_FIELDS,
        variables: {
          id: ProductConstants.ID,
          keys: [CustomFieldDefinitionConstants.CollectionReferenceKey]
        }
      });

    const { product } = res.body.data;

    expect(product.customFields).toHaveLength(1);
    expect(product.customFields[0].value).toBe(
      ProductCustomFieldConstants.CollectionReferenceValue
    );
    expect(product.customFields[0].type).toBe('COLLECTION_REFERENCE');
    expect(product.customFields[0].isList).toBe(false);
  });

  test('returns list custom field correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_PRODUCT_WITH_CUSTOM_FIELDS,
        variables: {
          id: ProductConstants.ID,
          keys: [CustomFieldDefinitionConstants.IntegerListKey]
        }
      });

    const { product } = res.body.data;

    expect(product.customFields).toHaveLength(1);
    expect(product.customFields[0].value).toEqual(ProductCustomFieldConstants.IntegerListValue);
    expect(product.customFields[0].type).toBe('INTEGER');
    expect(product.customFields[0].isList).toBe(true);
  });

  test('returns custom fields ordered by definition order', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_PRODUCT_WITH_CUSTOM_FIELDS,
        variables: {
          id: ProductConstants.ID,
          keys: ALL_KEYS
        }
      });

    const { product } = res.body.data;
    const keys = product.customFields.map(f => f.key);

    expect(keys).toEqual(ALL_KEYS);
  });

  test('returns empty array when product has no custom fields', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_PRODUCT_WITH_CUSTOM_FIELDS,
        variables: {
          id: ProductConstants.WithoutFieldsID,
          keys: ALL_KEYS
        }
      });

    const { product } = res.body.data;

    expect(product.customFields).toEqual([]);
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
        query: GET_PRODUCT_WITH_CUSTOM_FIELDS,
        variables: {
          id: ProductConstants.ID,
          keys: requestedKeys
        }
      });

    const { product } = res.body.data;

    expect(product.customFields).toHaveLength(3);
    expect(product.customFields.map(f => f.key)).toEqual(requestedKeys);
  });

  test('returns product references correctly', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_PRODUCT_WITH_CUSTOM_FIELDS,
        variables: {
          id: ProductConstants.ID,
          keys: [CustomFieldDefinitionConstants.ProductReferenceKey]
        }
      });

    const { product } = res.body.data;

    expect(product.customFields).toHaveLength(1);
    expect(product.customFields[0].type).toBe('PRODUCT_REFERENCE');
    expect(product.customFields[0].references.count).toBe(1);
    expect(product.customFields[0].references.pageInfo.total).toBe(1);
    expect(product.customFields[0].references.items).toHaveLength(1);
    expect(product.customFields[0].references.items[0]).toEqual({
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
        query: GET_PRODUCT_WITH_CUSTOM_FIELDS,
        variables: {
          id: ProductConstants.ID,
          keys: [CustomFieldDefinitionConstants.CollectionReferenceKey]
        }
      });

    const { product } = res.body.data;

    expect(product.customFields).toHaveLength(1);
    expect(product.customFields[0].type).toBe('COLLECTION_REFERENCE');
    expect(product.customFields[0].references.count).toBe(1);
    expect(product.customFields[0].references.pageInfo.total).toBe(1);
    expect(product.customFields[0].references.items).toHaveLength(1);
    expect(product.customFields[0].references.items[0]).toEqual({
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
        query: GET_PRODUCT_WITH_CUSTOM_FIELDS,
        variables: {
          id: ProductConstants.ID,
          keys: [CustomFieldDefinitionConstants.SingleLineTextKey]
        }
      });

    const { product } = res.body.data;

    expect(product.customFields).toHaveLength(1);
    expect(product.customFields[0].type).toBe('SINGLE_LINE_TEXT');
    expect(product.customFields[0].references.count).toBe(0);
    expect(product.customFields[0].references.items).toEqual([]);
    expect(product.customFields[0].references.pageInfo.total).toBe(0);
  });

  test('returns all product references in a list field', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_PRODUCT_WITH_CUSTOM_FIELDS,
        variables: {
          id: ProductConstants.ID,
          keys: [CustomFieldDefinitionConstants.ProductReferenceListKey]
        }
      });

    const { product } = res.body.data;

    expect(product.customFields).toHaveLength(1);
    expect(product.customFields[0].type).toBe('PRODUCT_REFERENCE');
    expect(product.customFields[0].isList).toBe(true);
    expect(product.customFields[0].references.count).toBe(3);
    expect(product.customFields[0].references.pageInfo.total).toBe(3);
    expect(product.customFields[0].references.items).toHaveLength(3);
    expect(product.customFields[0].references.items[0].id).toBe(
      ProductConstants.ReferencedProductID
    );
    expect(product.customFields[0].references.items[1].id).toBe(
      ProductConstants.ReferencedProduct2ID
    );
    expect(product.customFields[0].references.items[2].id).toBe(
      ProductConstants.ReferencedProduct3ID
    );
  });

  test('paginates product references with skip and take', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_PRODUCT_WITH_CUSTOM_FIELDS,
        variables: {
          id: ProductConstants.ID,
          keys: [CustomFieldDefinitionConstants.ProductReferenceListKey],
          referencesInput: { skip: 1, take: 1 }
        }
      });

    const { product } = res.body.data;

    expect(product.customFields).toHaveLength(1);
    expect(product.customFields[0].references.count).toBe(1);
    expect(product.customFields[0].references.pageInfo.total).toBe(3);
    expect(product.customFields[0].references.items).toHaveLength(1);
    expect(product.customFields[0].references.items[0].id).toBe(
      ProductConstants.ReferencedProduct2ID
    );
  });

  test('paginates collection references with skip and take', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_PRODUCT_WITH_CUSTOM_FIELDS,
        variables: {
          id: ProductConstants.ID,
          keys: [CustomFieldDefinitionConstants.CollectionReferenceListKey],
          referencesInput: { skip: 0, take: 2 }
        }
      });

    const { product } = res.body.data;

    expect(product.customFields).toHaveLength(1);
    expect(product.customFields[0].references.count).toBe(2);
    expect(product.customFields[0].references.pageInfo.total).toBe(3);
    expect(product.customFields[0].references.items).toHaveLength(2);
    expect(product.customFields[0].references.items[0].id).toBe(
      CollectionConstants.ReferencedCollectionID
    );
    expect(product.customFields[0].references.items[1].id).toBe(
      CollectionConstants.ReferencedCollection2ID
    );
  });

  test('returns empty items when skip exceeds total references', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_PRODUCT_WITH_CUSTOM_FIELDS,
        variables: {
          id: ProductConstants.ID,
          keys: [CustomFieldDefinitionConstants.ProductReferenceListKey],
          referencesInput: { skip: 10, take: 5 }
        }
      });

    const { product } = res.body.data;

    expect(product.customFields).toHaveLength(1);
    expect(product.customFields[0].references.count).toBe(0);
    expect(product.customFields[0].references.pageInfo.total).toBe(3);
    expect(product.customFields[0].references.items).toHaveLength(0);
  });

  test('returns all custom object references in a list field', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_PRODUCT_WITH_CUSTOM_FIELDS,
        variables: {
          id: ProductConstants.ID,
          keys: [CustomFieldDefinitionConstants.CustomObjectReferenceListKey]
        }
      });

    const { product } = res.body.data;

    expect(product.customFields).toHaveLength(1);
    expect(product.customFields[0].type).toBe('CUSTOM_OBJECT_REFERENCE');
    expect(product.customFields[0].isList).toBe(true);
    expect(product.customFields[0].references.count).toBe(3);
    expect(product.customFields[0].references.pageInfo.total).toBe(3);
    expect(product.customFields[0].references.items).toHaveLength(3);
    expect(product.customFields[0].references.items[0]).toEqual({
      __typename: 'CustomObject',
      id: CustomObjectEntryConstants.ReferencedEntryID,
      slug: CustomObjectEntryConstants.ReferencedEntrySlug
    });
    expect(product.customFields[0].references.items[1]).toEqual({
      __typename: 'CustomObject',
      id: CustomObjectEntryConstants.ReferencedEntry2ID,
      slug: CustomObjectEntryConstants.ReferencedEntry2Slug
    });
    expect(product.customFields[0].references.items[2]).toEqual({
      __typename: 'CustomObject',
      id: CustomObjectEntryConstants.ReferencedEntry3ID,
      slug: CustomObjectEntryConstants.ReferencedEntry3Slug
    });
  });

  test('paginates custom object references with skip and take', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_PRODUCT_WITH_CUSTOM_FIELDS,
        variables: {
          id: ProductConstants.ID,
          keys: [CustomFieldDefinitionConstants.CustomObjectReferenceListKey],
          referencesInput: { skip: 1, take: 1 }
        }
      });

    const { product } = res.body.data;

    expect(product.customFields).toHaveLength(1);
    expect(product.customFields[0].references.count).toBe(1);
    expect(product.customFields[0].references.pageInfo.total).toBe(3);
    expect(product.customFields[0].references.items).toHaveLength(1);
    expect(product.customFields[0].references.items[0]).toEqual({
      __typename: 'CustomObject',
      id: CustomObjectEntryConstants.ReferencedEntry2ID,
      slug: CustomObjectEntryConstants.ReferencedEntry2Slug
    });
  });

  test('returns translated value when locale is provided', async () => {
    await testHelper.loadFixtures([new ProductCustomFieldTranslationFixtures()]);

    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_lune_storefront_locale', ProductCustomFieldTranslationConstants.Locale)
      .send({
        query: GET_PRODUCT_WITH_CUSTOM_FIELDS,
        variables: {
          id: ProductConstants.ID,
          keys: [CustomFieldDefinitionConstants.SingleLineTextKey]
        }
      });

    const { product } = res.body.data;

    expect(product.customFields).toHaveLength(1);
    expect(product.customFields[0].key).toBe(CustomFieldDefinitionConstants.SingleLineTextKey);
    expect(product.customFields[0].value).toBe('Translated value');
  });
});

const GET_PRODUCT_WITH_CUSTOM_FIELDS = /* GraphQL */ `
  query Product($id: ID!, $keys: [String!]!, $referencesInput: ListInput) {
    product(id: $id) {
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
            ... on CustomObject {
              id
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
