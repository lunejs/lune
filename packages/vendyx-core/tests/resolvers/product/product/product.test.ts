import { VendyxServer } from '@/server';
import request from 'supertest';
import { TEST_VENDYX_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { ProductConstants, ProductFixtures } from './fixtures/product.fixtures';
import { AssetFixtures } from './fixtures/asset.fixtures';
import { ProductAssetFixtures } from './fixtures/product-asset.fixtures';
import { TagFixtures } from './fixtures/tag.fixtures';
import { ProductTagFixtures } from './fixtures/product-tag.fixtures';

describe('product - Query', () => {
  const testHelper = new TestHelper();

  const vendyxServer = new VendyxServer(TEST_VENDYX_CONFIG);
  const app = vendyxServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new ProductFixtures(),
      new AssetFixtures(),
      new ProductAssetFixtures(),
      new TagFixtures(),
      new ProductTagFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await vendyxServer.teardown();
  });

  test('returns product by id', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCT_QUERY,
        variables: {
          id: ProductConstants.AppleWatchSeries8ID
        }
      });

    const { product } = res.body.data;

    expect(product.id).toBe(ProductConstants.AppleWatchSeries8ID);
  });

  test('returns product by slug', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCT_QUERY,
        variables: {
          slug: ProductConstants.MacBookPro16Slug
        }
      });

    const { product } = res.body.data;

    expect(product.slug).toBe(ProductConstants.MacBookPro16Slug);
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: GET_PRODUCT_QUERY,
        variables: {
          id: ProductConstants.AppleWatchSeries8ID
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });

  test('returns assets', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCT_QUERY,
        variables: {
          id: ProductConstants.iPhone14ProMaxID
        }
      });

    const { product } = res.body.data;

    expect(product.assets.count).toBe(2);
    expect(product.assets.pageInfo.total).toBe(2);
  });

  test('returns assets with pagination', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCT_QUERY,
        variables: {
          id: ProductConstants.iPhone14ProMaxID,
          assetInput: {
            take: 1
          }
        }
      });

    const { product } = res.body.data;

    expect(product.assets.count).toBe(1);
    expect(product.assets.pageInfo.total).toBe(2);
  });

  test('returns tags', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCT_QUERY,
        variables: {
          id: ProductConstants.MacBookPro16ID
        }
      });

    const { product } = res.body.data;

    expect(product.tags).toHaveLength(3);
  });
});

const GET_PRODUCT_QUERY = /* GraphQL */ `
  query Product($id: ID, $slug: String, $assetInput: ListInput) {
    product(id: $id, slug: $slug) {
      id
      createdAt
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
      assets(input: $assetInput) {
        count
        pageInfo {
          total
        }
        items {
          id
        }
      }
    }
  }
`;
