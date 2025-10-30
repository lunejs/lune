import request from 'supertest';

import { convertToCent } from '@lune/common';

import { OrderBy } from '@/api/shared/types/graphql';
import type { ProductTable } from '@/persistence/entities/product';
import { Tables } from '@/persistence/tables';
import { VendyxServer } from '@/server';
import { TEST_VENDYX_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { OptionFixtures } from './fixtures/option.fixtures';
import { OptionValueFixtures } from './fixtures/option-value.fixtures';
import { ProductConstants, ProductFixtures } from './fixtures/product.fixtures';
import { ProductTagFixtures } from './fixtures/product-tag.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { TagFixtures } from './fixtures/tag.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';
import { VariantFixtures } from './fixtures/variant.fixtures';
import { VariantOptionValueFixtures } from './fixtures/variant-option-value.fixtures';

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
      new ProductTagFixtures(),
      new OptionFixtures(),
      new OptionValueFixtures(),
      new VariantFixtures(),
      new VariantOptionValueFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await vendyxServer.teardown();
  });

  test('returns a list of products with pagination', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCTS_QUERY,
        variables: {
          input: {
            skip: 4,
            take: 4
          }
        }
      });

    const { products } = res.body.data;

    expect(products.items).toHaveLength(3);
    expect(products.count).toBe(3);
    expect(products.pageInfo.total).toBe(7);
    expect(products.items[0].id).toBe(ProductConstants.JacketID);
    expect(products.items[1].id).toBe(ProductConstants.SneakersID);
    expect(products.items[2].id).toBe(ProductConstants.BeachShirtID);
  });

  test('returns a list of products with name filter (contains)', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCTS_QUERY,
        variables: {
          input: {
            filters: {
              name: { contains: 'shirt' }
            }
          }
        }
      });

    const { products } = res.body.data;

    expect(products.items).toHaveLength(2);
    expect(products.count).toBe(2);
    expect(products.pageInfo.total).toBe(2);
    expect(products.items[0].id).toBe(ProductConstants.ShirtID);
    expect(products.items[1].id).toBe(ProductConstants.BeachShirtID);
  });

  test('returns a list of products with name filter (equals)', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCTS_QUERY,
        variables: {
          input: {
            filters: {
              name: { equals: 'Leather Jacket' }
            }
          }
        }
      });

    const { products } = res.body.data;

    expect(products.items).toHaveLength(1);
    expect(products.count).toBe(1);
    expect(products.pageInfo.total).toBe(1);
    expect(products.items[0].id).toBe(ProductConstants.JacketID);
  });

  test('returns a list of products with name filter (equals) with input matching for includes but not for equals', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCTS_QUERY,
        variables: {
          input: {
            filters: {
              name: { equals: 'Shirt' }
            }
          }
        }
      });

    const { products } = res.body.data;

    expect(products.items).toHaveLength(0);
    expect(products.count).toBe(0);
    expect(products.pageInfo.total).toBe(0);
  });

  test('returns a list of products with tags filter', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCTS_QUERY,
        variables: {
          input: {
            filters: {
              tag: 'electronics'
            }
          }
        }
      });

    const { products } = res.body.data;

    expect(products.items).toHaveLength(2);
    expect(products.count).toBe(2);
    expect(products.pageInfo.total).toBe(2);
  });

  test('returns a list of products with min sale price range filter', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCTS_QUERY,
        variables: {
          input: {
            filters: {
              salePriceRange: {
                min: 23_000
              }
            }
          }
        }
      });

    const { products } = res.body.data;

    expect(products.items.every(p => p.minSalePrice >= convertToCent(23_000))).toBe(true);
  });

  test('returns a list of products with max sale price range filter', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCTS_QUERY,
        variables: {
          input: {
            filters: {
              salePriceRange: {
                max: 10_000
              }
            }
          }
        }
      });

    const { products } = res.body.data;

    expect(products.items.every(p => p.maxSalePrice <= convertToCent(10_000))).toBe(true);
  });

  test('returns a list of products with both min and max sale price range filter', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCTS_QUERY,
        variables: {
          input: {
            filters: {
              salePriceRange: {
                min: 50,
                max: 500
              }
            }
          }
        }
      });

    const { products } = res.body.data;

    expect(products.items.every(p => p.minSalePrice >= convertToCent(50))).toBe(true);
    expect(products.items.every(p => p.maxSalePrice <= convertToCent(500))).toBe(true);
  });

  test('returns a list of products matching option values in the same group (OR)', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCTS_QUERY,
        variables: {
          input: {
            filters: {
              optionValues: [{ option: 'Color', values: ['Red', 'Green'] }]
            }
          }
        }
      });

    const { products } = res.body.data;

    expect(products.items).toHaveLength(2);
    expect(products.count).toBe(2);
    expect(products.pageInfo.total).toBe(2);
    expect(products.items.find(p => p.id === ProductConstants.ShirtID)).toBeDefined();
    expect(products.items.find(p => p.id === ProductConstants.JacketID)).toBeDefined();
  });

  test('returns a list of products matching multiple option values in different groups (AND)', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCTS_QUERY,
        variables: {
          input: {
            filters: {
              optionValues: [
                { option: 'Color', values: ['Red'] },
                { option: 'Material', values: ['Cotton'] }
              ]
            }
          }
        }
      });

    const { products } = res.body.data;

    expect(products.items).toHaveLength(1);
    expect(products.count).toBe(1);
    expect(products.pageInfo.total).toBe(1);
    expect(products.items[0].id).toBe(ProductConstants.JacketID);
  });

  test('returns a list of products matching sort by createdAt in descending order', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCTS_QUERY,
        variables: {
          input: {
            sort: { createdAt: OrderBy.Desc }
          }
        }
      });

    const { products } = res.body.data;

    const sorted = await testHelper
      .getQueryBuilder()<ProductTable>(Tables.Product)
      .orderBy('created_at', 'desc')
      .where({ enabled: true });

    expect(products.items).toHaveLength(7);
    expect(sorted.map(p => p.id)).toEqual(products.items.map(p => p.id));
  });

  test('returns a list of products matching sort by createdAt in ascending order', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCTS_QUERY,
        variables: {
          input: {
            sort: { createdAt: OrderBy.Asc }
          }
        }
      });

    const { products } = res.body.data;

    const sorted = await testHelper
      .getQueryBuilder()<ProductTable>(Tables.Product)
      .orderBy('created_at', 'asc')
      .where({ enabled: true });

    expect(products.items).toHaveLength(7);
    expect(sorted.map(p => p.id)).toEqual(products.items.map(p => p.id));
  });

  test('returns a list of products matching sort by name in descending order', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCTS_QUERY,
        variables: {
          input: {
            sort: { name: OrderBy.Desc }
          }
        }
      });

    const { products } = res.body.data;

    const sorted = await testHelper
      .getQueryBuilder()<ProductTable>(Tables.Product)
      .orderBy('name', 'desc')
      .where({ enabled: true });

    expect(products.items).toHaveLength(7);
    expect(sorted.map(p => p.id)).toEqual(products.items.map(p => p.id));
  });

  test('returns a list of products matching sort by name in ascending order', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCTS_QUERY,
        variables: {
          input: {
            sort: { name: OrderBy.Asc }
          }
        }
      });

    const { products } = res.body.data;

    const sorted = await testHelper
      .getQueryBuilder()<ProductTable>(Tables.Product)
      .orderBy('name', 'asc')
      .where({ enabled: true });

    expect(products.items).toHaveLength(7);
    expect(sorted.map(p => p.id)).toEqual(products.items.map(p => p.id));
  });

  test('returns a list of products matching sort by min sale price in descending order', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCTS_QUERY,
        variables: {
          input: {
            sort: { salePrice: OrderBy.Desc }
          }
        }
      });

    const { products } = res.body.data;

    const sorted = await testHelper
      .getQueryBuilder()<ProductTable>(Tables.Product)
      .orderBy('min_sale_price', 'desc')
      .where({ enabled: true });

    expect(products.items).toHaveLength(7);
    expect(sorted.map(p => p.id)).toEqual(products.items.map(p => p.id));
  });

  test('returns a list of products matching sort by min sale price in ascending order', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCTS_QUERY,
        variables: {
          input: {
            sort: { salePrice: OrderBy.Desc }
          }
        }
      });

    const { products } = res.body.data;

    const sorted = await testHelper
      .getQueryBuilder()<ProductTable>(Tables.Product)
      .orderBy('min_sale_price', 'desc')
      .where({ enabled: true });

    expect(products.items).toHaveLength(7);
    expect(sorted.map(p => p.id)).toEqual(products.items.map(p => p.id));
  });

  test('returns a list of products limited to 3 items', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCTS_QUERY,
        variables: {
          input: {
            take: 3
          }
        }
      });

    const { products } = res.body.data;

    expect(products.items).toHaveLength(3);
  });

  test('returns a list of products with offset of 2', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCTS_QUERY,
        variables: {
          input: {
            skip: 2
          }
        }
      });

    const { products } = res.body.data;

    expect(products.items).toHaveLength(5);
  });

  test('returns a list of products with pagination and order applied', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCTS_QUERY,
        variables: {
          input: {
            take: 2,
            skip: 1,
            sort: { createdAt: OrderBy.Desc }
          }
        }
      });

    const { products } = res.body.data;

    expect(products.items).toHaveLength(2);
    expect(products.items[0].id).toBe(ProductConstants.iPhone14ProMaxID);
    expect(products.items[1].id).toBe(ProductConstants.ShirtID);
  });

  test('returns a list of products with name and tag filter applied', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCTS_QUERY,
        variables: {
          input: {
            filters: {
              name: { contains: 'Shirt' },
              tag: 'clothing'
            }
          }
        }
      });

    const { products } = res.body.data;

    expect(products.items).toHaveLength(2);
    expect(products.count).toBe(2);
    expect(products.pageInfo.total).toBe(2);
    expect(products.items.find(p => p.id === ProductConstants.ShirtID)).toBeDefined();
    expect(products.items.find(p => p.id === ProductConstants.BeachShirtID)).toBeDefined();
  });

  test('returns a list of products with option values and price range filter applied', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCTS_QUERY,
        variables: {
          input: {
            filters: {
              optionValues: [{ option: 'Color', values: ['Red'] }],
              salePriceRange: { min: 90 }
            }
          }
        }
      });

    const { products } = res.body.data;

    expect(products.items).toHaveLength(1);
    expect(products.count).toBe(1);
    expect(products.pageInfo.total).toBe(1);
    expect(products.items[0].id).toBe(ProductConstants.JacketID);
  });

  test('returns a list of products with name and option values filter applied', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCTS_QUERY,
        variables: {
          input: {
            filters: {
              optionValues: [{ option: 'Color', values: ['Red'] }],
              name: { contains: 'Shirt' }
            }
          }
        }
      });

    const { products } = res.body.data;

    expect(products.items).toHaveLength(1);
    expect(products.count).toBe(1);
    expect(products.pageInfo.total).toBe(1);
    expect(products.items[0].id).toBe(ProductConstants.ShirtID);
  });

  test('returns a list of products with filters and sort applied', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_vendyx_storefront_api_key', ShopConstants.StorefrontApiKey)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCTS_QUERY,
        variables: {
          input: {
            filters: { name: { contains: 'Shirt' }, tag: 'clothing' },
            sort: { createdAt: OrderBy.Asc }
          }
        }
      });

    const { products } = res.body.data;

    expect(products.items).toHaveLength(2);
    expect(products.count).toBe(2);
    expect(products.pageInfo.total).toBe(2);
    expect(products.items[0].id).toBe(ProductConstants.BeachShirtID);
    expect(products.items[1].id).toBe(ProductConstants.ShirtID);
  });

  test('returns Authorization error when no storefront api key is provided', async () => {
    const response = await request(app)
      .post('/storefront-api')
      .send({
        query: GET_PRODUCTS_QUERY,
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
        query: GET_PRODUCTS_QUERY,
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
        query: GET_PRODUCTS_QUERY,
        variables: {
          id: ProductConstants.AppleWatchSeries8ID
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const GET_PRODUCTS_QUERY = /* GraphQL */ `
  query Products($input: ProductListInput) {
    products(input: $input) {
      items {
        id
        createdAt
        name
        slug
        description
        enabled
        minSalePrice
        maxSalePrice
      }
      count
      pageInfo {
        total
      }
    }
  }
`;
