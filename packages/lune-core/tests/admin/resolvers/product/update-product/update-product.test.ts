import request from 'supertest';

import { VendyxServer } from '@/server';
import { TEST_VENDYX_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { AssetConstants, AssetFixtures } from './fixtures/asset.fixtures';
import { ProductConstants, ProductFixtures } from './fixtures/product.fixtures';
import { ProductAssetFixtures } from './fixtures/product-asset.fixtures';
import { ProductTagFixtures } from './fixtures/product-tag.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { TagConstants, TagFixtures } from './fixtures/tag.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('updateProduct - Mutation', () => {
  const testHelper = new TestHelper();

  const vendyxServer = new VendyxServer(TEST_VENDYX_CONFIG);
  const app = vendyxServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new ProductFixtures(),
      new TagFixtures(),
      new ProductTagFixtures(),
      new AssetFixtures(),
      new ProductAssetFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await vendyxServer.teardown();
  });

  test('update a basic product', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
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
      .set('x_vendyx_shop_id', ShopConstants.ID)
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
      .set('x_vendyx_shop_id', ShopConstants.ID)
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
      .set('x_vendyx_shop_id', ShopConstants.ID)
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
      .set('x_vendyx_shop_id', ShopConstants.ID)
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
      .set('x_vendyx_shop_id', ShopConstants.ID)
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
    }
  }
`;
