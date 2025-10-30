import request from 'supertest';

import { Locale } from '@/persistence/entities/locale';
import { VendyxServer } from '@/server';
import { TEST_VENDYX_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { AssetFixtures } from './fixtures/asset.fixtures';
import { ProductConstants, ProductFixtures } from './fixtures/product.fixtures';
import { ProductAssetFixtures } from './fixtures/product-asset.fixtures';
import { ProductTagFixtures } from './fixtures/product-tag.fixtures';
import {
  ProductTranslationConstants,
  ProductTranslationFixtures
} from './fixtures/product-translation.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { TagFixtures } from './fixtures/tag.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';

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
      new ProductTagFixtures(),
      new ProductTranslationFixtures()
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
      .post('/storefront-api')
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
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
      .post('/storefront-api')
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_PRODUCT_QUERY,
        variables: {
          slug: ProductConstants.MacBookPro16Slug
        }
      });

    const { product } = res.body.data;

    expect(product.slug).toBe(ProductConstants.MacBookPro16Slug);
  });

  test('return null when product is disabled (id)', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_PRODUCT_QUERY,
        variables: {
          id: ProductConstants.DisabledProductId
        }
      });

    const { product } = res.body.data;

    expect(product).toBe(null);
  });

  test('return null when product is disabled (slug)', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: GET_PRODUCT_QUERY,
        variables: {
          slug: ProductConstants.DisabledProductSlug
        }
      });

    const { product } = res.body.data;

    expect(product).toBe(null);
  });

  test('returns translated product when locale is provided', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_vendyx_storefront_locale', Locale.EN)
      .send({
        query: GET_PRODUCT_QUERY,
        variables: {
          id: ProductConstants.MacBookPro16ID
        }
      });

    const { product } = res.body.data;

    expect(product.name).toBe(ProductTranslationConstants.Name);
    expect(product.slug).toBe(ProductTranslationConstants.Slug);
    expect(product.description).toBe(ProductTranslationConstants.Description);
  });

  test('returns normal product when locale does not match', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_vendyx_storefront_locale', Locale.FR)
      .send({
        query: GET_PRODUCT_QUERY,
        variables: {
          id: ProductConstants.MacBookPro16ID
        }
      });

    const { product } = res.body.data;

    expect(product.name).toBe(ProductConstants.MacBookPro16Name);
    expect(product.slug).toBe(ProductConstants.MacBookPro16Slug);
    expect(product.description).toBe(ProductConstants.MacBookPro16Description);
  });

  test('returns Authorization error when no storefront api key is provided', async () => {
    const response = await request(app)
      .post('/storefront-api')
      .send({
        query: GET_PRODUCT_QUERY,
        variables: {
          id: ProductConstants.AppleWatchSeries8ID
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });

  test('returns Authorization error when storefront api key is invalid', async () => {
    const response = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .set('x_vendyx_storefront_api_key', 'invalid_key')
      .send({
        query: GET_PRODUCT_QUERY,
        variables: {
          id: ProductConstants.AppleWatchSeries8ID
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });

  test('returns Authorization error when no shop id is provided', async () => {
    const response = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
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
      .post('/storefront-api')
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
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
      .post('/storefront-api')
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
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
      .post('/storefront-api')
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
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
