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
import { ProductAssetFixtures } from './fixtures/product-asset.fixtures';
import {
  ProductCustomFieldConstants,
  ProductCustomFieldFixtures
} from './fixtures/product-custom-field.fixtures';
import { ProductTagFixtures } from './fixtures/product-tag.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { TagConstants, TagFixtures } from './fixtures/tag.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('updateProduct - Mutation', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new ProductFixtures(),
      new TagFixtures(),
      new ProductTagFixtures(),
      new AssetFixtures(),
      new ProductAssetFixtures(),
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

  test('update a basic product', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_PRODUCT_MUTATION,
        variables: {
          id: ProductConstants.ID,
          input: {
            name: 'Playstation 5',
            description: 'One of the biggest creation of humanity'
          }
        }
      });

    const { updateProduct } = res.body.data;

    expect(updateProduct.slug).toBe(ProductConstants.Slug);
    expect(updateProduct.name).toBe('Playstation 5');
    expect(updateProduct.assets.count).toBe(1);
  });

  test('set null description', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_PRODUCT_MUTATION,
        variables: {
          id: ProductConstants.ID,
          input: {
            name: 'Playstation 5',
            description: null
          }
        }
      });

    const { updateProduct } = res.body.data;

    expect(updateProduct.slug).toBe(ProductConstants.Slug);
    expect(updateProduct.name).toBe('Playstation 5');
    expect(updateProduct.description).toBe(null);
    expect(updateProduct.assets.count).toBe(1);
  });

  test('add new assets to product', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_PRODUCT_MUTATION,
        variables: {
          id: ProductConstants.ID,
          input: {
            assets: [
              { id: AssetConstants.ImageID, order: 0 },
              { id: AssetConstants.MeImageID, order: 1 }
            ]
          }
        }
      });

    const { updateProduct } = res.body.data;

    expect(updateProduct.slug).toBe(ProductConstants.Slug);
    expect(updateProduct.assets.items[0].id).toBe(AssetConstants.ImageID);
    expect(updateProduct.assets.items[1].id).toBe(AssetConstants.MeImageID);
    expect(updateProduct.assets.count).toBe(2);
  });

  test('add new tags to product', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_PRODUCT_MUTATION,
        variables: {
          id: ProductConstants.ID,
          input: {
            tags: [TagConstants.ClothingID, TagConstants.ElectronicsID]
          }
        }
      });

    const { updateProduct } = res.body.data;

    expect(updateProduct.slug).toBe(ProductConstants.Slug);
    expect(updateProduct.tags[0].id).toBe(TagConstants.ClothingID);
    expect(updateProduct.tags[1].id).toBe(TagConstants.ElectronicsID);
    expect(updateProduct.tags).toHaveLength(2);
  });

  test('re order assets', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_PRODUCT_MUTATION,
        variables: {
          id: ProductConstants.ID,
          input: {
            assets: [
              { id: AssetConstants.ImageID, order: 0 },
              { id: AssetConstants.AlreadyStoredImageID, order: 1 }
            ]
          }
        }
      });

    const { updateProduct } = res.body.data;

    expect(updateProduct.slug).toBe(ProductConstants.Slug);
    expect(updateProduct.assets.items[0].id).toBe(AssetConstants.ImageID);
    expect(updateProduct.assets.items[1].id).toBe(AssetConstants.AlreadyStoredImageID);
    expect(updateProduct.assets.count).toBe(2);
  });

  test('remove all assets from product', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_PRODUCT_MUTATION,
        variables: {
          id: ProductConstants.ID,
          input: {
            assets: []
          }
        }
      });

    const { updateProduct } = res.body.data;

    expect(updateProduct.slug).toBe(ProductConstants.Slug);
    expect(updateProduct.assets.items).toHaveLength(0);
    expect(updateProduct.assets.count).toBe(0);
  });

  test('update existing custom field value', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_PRODUCT_MUTATION,
        variables: {
          id: ProductConstants.ID,
          input: {
            customFields: [{ id: CustomFieldDefinitionConstants.BrandID, value: 'Samsung' }]
          }
        }
      });

    const { updateProduct } = res.body.data;

    const brandField = updateProduct.customFieldEntries.find(
      (cf: { definition: { key: string } }) => cf.definition.key === 'brand'
    );
    expect(brandField.value).toBe('Samsung');

    // Weight should still exist with original value
    const weightField = updateProduct.customFieldEntries.find(
      (cf: { definition: { key: string } }) => cf.definition.key === 'weight'
    );
    expect(weightField.value).toBe(ProductCustomFieldConstants.WeightValue);
  });

  test('add new custom field to product', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_PRODUCT_MUTATION,
        variables: {
          id: ProductConstants.ID,
          input: {
            customFields: [
              { id: CustomFieldDefinitionConstants.MaterialID, value: ['Cotton', 'Silk'] },
              { id: CustomFieldDefinitionConstants.IsOrganicID, value: true }
            ]
          }
        }
      });

    const { updateProduct } = res.body.data;

    // New fields should be added
    const materialField = updateProduct.customFieldEntries.find(
      (cf: { definition: { key: string } }) => cf.definition.key === 'material'
    );
    expect(materialField.value).toEqual(['Cotton', 'Silk']);
    expect(materialField.definition.isList).toBe(true);

    const isOrganicField = updateProduct.customFieldEntries.find(
      (cf: { definition: { key: string } }) => cf.definition.key === 'is_organic'
    );
    expect(isOrganicField.value).toBe(true);
    expect(isOrganicField.definition.type).toBe('BOOLEAN');

    // Existing fields should still be there
    expect(updateProduct.customFieldEntries).toHaveLength(4);
  });

  test('update and add custom fields simultaneously', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_PRODUCT_MUTATION,
        variables: {
          id: ProductConstants.ID,
          input: {
            customFields: [
              { id: CustomFieldDefinitionConstants.BrandID, value: 'Nike' },
              { id: CustomFieldDefinitionConstants.WeightID, value: 250 },
              { id: CustomFieldDefinitionConstants.IsOrganicID, value: false }
            ]
          }
        }
      });

    const { updateProduct } = res.body.data;

    // Updated fields
    const brandField = updateProduct.customFieldEntries.find(
      (cf: { definition: { key: string } }) => cf.definition.key === 'brand'
    );
    expect(brandField.value).toBe('Nike');

    const weightField = updateProduct.customFieldEntries.find(
      (cf: { definition: { key: string } }) => cf.definition.key === 'weight'
    );
    expect(weightField.value).toBe(250);

    // New field
    const isOrganicField = updateProduct.customFieldEntries.find(
      (cf: { definition: { key: string } }) => cf.definition.key === 'is_organic'
    );
    expect(isOrganicField.value).toBe(false);

    expect(updateProduct.customFieldEntries).toHaveLength(3);
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: UPDATE_PRODUCT_MUTATION,
        variables: {
          id: ProductConstants.ID,
          input: {
            name: 'The last of us part III'
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const UPDATE_PRODUCT_MUTATION = /* GraphQL */ `
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
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
