import request from 'supertest';

import { VendyxServer } from '@/server';
import { TEST_VENDYX_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { AssetConstants, AssetFixtures } from './fixtures/asset.fixtures';
import { ProductConstants, ProductFixtures } from './fixtures/product.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { TagConstants, TagFixtures } from './fixtures/tag.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('product - Query', () => {
  const testHelper = new TestHelper();

  const vendyxServer = new VendyxServer(TEST_VENDYX_CONFIG);
  const app = vendyxServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new ProductFixtures(),
      new TagFixtures(),
      new AssetFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await vendyxServer.teardown();
  });

  test('creates a basic product', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
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
      .set('x_vendyx_shop_id', ShopConstants.ID)
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

  test('creates a product with assets', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
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
      .set('x_vendyx_shop_id', ShopConstants.ID)
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
    }
  }
`;
