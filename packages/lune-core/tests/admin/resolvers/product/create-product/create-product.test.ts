import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { AssetConstants, AssetFixtures } from './fixtures/asset.fixtures';
import {
  CustomFieldDefinitionConstants,
  CustomFieldDefinitionFixtures
} from './fixtures/custom-field-definition.fixtures';
import { ProductConstants, ProductFixtures } from './fixtures/product.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { TagConstants, TagFixtures } from './fixtures/tag.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('product - Query', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new ProductFixtures(),
      new TagFixtures(),
      new AssetFixtures(),
      new CustomFieldDefinitionFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('creates a basic product', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_PRODUCT_MUTATION,
        variables: {
          input: {
            name: 'Playstation 5',
            description: 'One of the biggest creation of humanity'
          }
        }
      });

    const { createProduct } = res.body.data;

    expect(createProduct.slug).toBe('playstation-5');
    expect(createProduct.enabled).toBe(true);
  });

  test('creates a product with the same name', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_PRODUCT_MUTATION,
        variables: {
          input: {
            name: ProductConstants.Name
          }
        }
      });

    const { createProduct } = res.body.data;

    expect(createProduct.slug).toBe('macbook-pro-16-1');
    expect(createProduct.enabled).toBe(true);
  });

  test('creates a product with a name that generates same slug', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_PRODUCT_MUTATION,
        variables: {
          input: {
            name: ProductConstants.Name.toUpperCase()
          }
        }
      });

    const { createProduct } = res.body.data;

    expect(createProduct.slug).toBe('macbook-pro-16-1');
    expect(createProduct.enabled).toBe(true);
  });

  test('creates a product with a name that is repeated more than once', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_PRODUCT_MUTATION,
        variables: {
          input: {
            name: ProductConstants.MultipleSameName
          }
        }
      });

    const { createProduct } = res.body.data;

    expect(createProduct.slug).toBe('same-name-3');
  });

  test('creates a product with a name that is not repeated but its generated slug is', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_PRODUCT_MUTATION,
        variables: {
          input: {
            name: ProductConstants.NoMatchingName
          }
        }
      });

    const { createProduct } = res.body.data;

    expect(createProduct.slug).toBe('random-slug-1');
  });

  test('creates a product with assets', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_PRODUCT_MUTATION,
        variables: {
          input: {
            name: 'The last of us part III',
            assets: [
              { id: AssetConstants.ImageID, order: 0 },
              { id: AssetConstants.MeImageID, order: 1 }
            ]
          }
        }
      });

    const { createProduct } = res.body.data;

    expect(createProduct.assets.items).toHaveLength(2);
    expect(createProduct.assets.count).toBe(2);
  });

  test('creates a product with tags', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_PRODUCT_MUTATION,
        variables: {
          input: {
            name: 'The last of us part III',
            tags: [TagConstants.ClothingID, TagConstants.DomesticsID, TagConstants.ElectronicsID]
          }
        }
      });

    const { createProduct } = res.body.data;

    expect(createProduct.tags).toHaveLength(3);
  });

  test('creates a product with custom fields', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_PRODUCT_MUTATION,
        variables: {
          input: {
            name: 'Product with custom fields',
            customFields: [
              { id: CustomFieldDefinitionConstants.BrandID, value: 'text value' },
              { id: CustomFieldDefinitionConstants.MaterialID, value: ['Cotton', 'Polyester'] },
              { id: CustomFieldDefinitionConstants.WeightID, value: 150 },
              { id: CustomFieldDefinitionConstants.IsOrganicID, value: true }
            ]
          }
        }
      });

    const { createProduct } = res.body.data;

    expect(createProduct.id).toBeDefined();
    expect(createProduct.name).toBe('Product with custom fields');
    expect(createProduct.customFieldEntries).toHaveLength(4);

    const brandField = createProduct.customFieldEntries.find(
      (cf: { definition: { key: string } }) => cf.definition.key === 'brand'
    );
    expect(brandField.value).toBe('text value');
    expect(brandField.definition.id).toBe(CustomFieldDefinitionConstants.BrandID);
    expect(brandField.definition.isList).toBe(false);

    const materialField = createProduct.customFieldEntries.find(
      (cf: { definition: { key: string } }) => cf.definition.key === 'material'
    );
    expect(materialField.value).toEqual(['Cotton', 'Polyester']);
    expect(materialField.definition.isList).toBe(true);

    const weightField = createProduct.customFieldEntries.find(
      (cf: { definition: { key: string } }) => cf.definition.key === 'weight'
    );
    expect(weightField.value).toBe(150);
    expect(weightField.definition.type).toBe('INTEGER');

    const isOrganicField = createProduct.customFieldEntries.find(
      (cf: { definition: { key: string } }) => cf.definition.key === 'is_organic'
    );
    expect(isOrganicField.value).toBe(true);
    expect(isOrganicField.definition.type).toBe('BOOLEAN');
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: CREATE_PRODUCT_MUTATION,
        variables: {
          input: {
            name: 'The last of us part III'
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const CREATE_PRODUCT_MUTATION = /* GraphQL */ `
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      createdAt
      updatedAt
      name
      slug
      description
      enabled
      minSalePrice
      maxSalePrice
      tags {
        id
        name
      }
      assets {
        count
        items {
          id
        }
      }
      customFieldEntries {
        value
        definition {
          id
          key
          name
          type
          isList
        }
      }
    }
  }
`;
