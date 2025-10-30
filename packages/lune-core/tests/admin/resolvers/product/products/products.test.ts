import request from 'supertest';

import { VendyxServer } from '@/server';
import { TEST_VENDYX_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { OptionFixtures } from './fixtures/option.fixtures';
import { OptionValueFixtures } from './fixtures/option-value.fixtures';
import { ProductConstants, ProductFixtures } from './fixtures/product.fixtures';
import { ProductTagFixtures } from './fixtures/product-tag.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { TagFixtures } from './fixtures/tag.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';
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
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
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

    expect(products.items).toHaveLength(4);
    expect(products.count).toBe(4);
    expect(products.pageInfo.total).toBe(9);
    expect(products.items[0].id).toBe(ProductConstants.ShirtID);
    expect(products.items[1].id).toBe(ProductConstants.JeansID);
    expect(products.items[2].id).toBe(ProductConstants.JacketID);
    expect(products.items[3].id).toBe(ProductConstants.SneakersID);
  });

  test('returns a list of products with name filter', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
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

  test('returns a list of products with enabled filter', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCTS_QUERY,
        variables: {
          input: {
            filters: {
              enabled: { equals: false }
            }
          }
        }
      });

    const { products } = res.body.data;

    expect(products.items).toHaveLength(2);
    expect(products.count).toBe(2);
    expect(products.pageInfo.total).toBe(2);
    expect(products.items[0].id).toBe(ProductConstants.AppleWatchSeries8ID);
    expect(products.items[1].id).toBe(ProductConstants.AirPodsPro2ndGenID);
  });

  test('returns a list of products without the product soft removed', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: GET_PRODUCTS_QUERY,
        variables: {}
      });

    const { products } = res.body.data;

    expect(products.items).toHaveLength(9);
    expect(products.count).toBe(9);
    expect(products.pageInfo.total).toBe(9);
    expect(products.items.every(p => p.id !== ProductConstants.SoftRemovedProduct)).toBe(true);
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
