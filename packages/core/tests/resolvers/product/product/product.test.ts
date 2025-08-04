import { VendyxServer } from '@/server';
import request from 'supertest';
import { TEST_VENDYX_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { ProductConstants, ProductFixtures } from './fixtures/product.fixtures';

describe('product - Query', () => {
  const testHelper = new TestHelper();

  const vendyxServer = new VendyxServer(TEST_VENDYX_CONFIG);
  const app = vendyxServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([new UserFixtures(), new ShopFixtures(), new ProductFixtures()]);
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
});

const GET_PRODUCT_QUERY = /* GraphQL */ `
  query Product($id: ID, $slug: String) {
    product(id: $id, slug: $slug) {
      id
      createdAt
      name
      slug
      description
      enabled
      minSalePrice
      maxSalePrice
    }
  }
`;
