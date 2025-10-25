import request from 'supertest';

import type { ID } from '@/index';
import type { OptionValueTable } from '@/persistence/entities/option_value';
import type { ProductTable } from '@/persistence/entities/product';
import type { ProductOptionTable } from '@/persistence/entities/product-option';
import { Tables } from '@/persistence/tables';
import { VendyxServer } from '@/server';
import { TEST_VENDYX_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { OptionFixtures } from './fixtures/option.fixtures';
import { OptionValueFixtures } from './fixtures/option-value.fixtures';
import { ProductConstants, ProductFixtures } from './fixtures/product.fixtures';
import { ProductOptionFixtures } from './fixtures/product-option.fixtures';
import { ProductTagFixtures } from './fixtures/product-tag.fixtures';
import { ProductTranslationFixtures } from './fixtures/product-translation.fixtures';
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
      new VariantOptionValueFixtures(),
      new ProductOptionFixtures(),
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

  test('remove a product with all data', async () => {
    const prevProduct = await getProduct(testHelper, ProductConstants.ShirtID);

    expect(prevProduct.options.length).toBe(2);
    expect(prevProduct.optionValues.length).toBe(6);
    expect(prevProduct.translations.length).toBe(1);
    expect(prevProduct.tags.length).toBe(1);

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: SOFT_REMOVE_PRODUCTS,
        variables: {
          ids: [ProductConstants.ShirtID]
        }
      });

    const { softRemoveProducts } = res.body.data;

    expect(softRemoveProducts).toBe(true);

    const afterProduct = await getProduct(testHelper, ProductConstants.ShirtID);

    expect(afterProduct?.product?.deleted_at).not.toBeNull();
    expect(afterProduct.options.length).toBe(0);
    expect(afterProduct.optionValues.length).toBe(0);
    expect(afterProduct.translations.length).toBe(0);
    expect(afterProduct.tags.length).toBe(0);
  });

  test('remove multiple products with different data', async () => {
    const [prevProduct1, prevProduct2, prevProduct3] = await Promise.all([
      getProduct(testHelper, ProductConstants.ShirtID),
      getProduct(testHelper, ProductConstants.JacketID),
      getProduct(testHelper, ProductConstants.MacBookPro16ID)
    ]);

    expect(prevProduct1.options.length).toBe(2);
    expect(prevProduct1.optionValues.length).toBe(6);
    expect(prevProduct1.translations.length).toBe(1);
    expect(prevProduct1.tags.length).toBe(1);

    expect(prevProduct2.options.length).toBe(2);
    expect(prevProduct2.optionValues.length).toBe(4);
    expect(prevProduct2.translations.length).toBe(0);
    expect(prevProduct2.tags.length).toBe(1);

    expect(prevProduct3.options.length).toBe(0);
    expect(prevProduct3.optionValues.length).toBe(0);
    expect(prevProduct3.translations.length).toBe(0);
    expect(prevProduct3.tags.length).toBe(1);

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: SOFT_REMOVE_PRODUCTS,
        variables: {
          ids: [
            ProductConstants.ShirtID,
            ProductConstants.JacketID,
            ProductConstants.MacBookPro16ID
          ]
        }
      });

    const { softRemoveProducts } = res.body.data;

    expect(softRemoveProducts).toBe(true);

    const [afterProduct1, afterProduct2, afterProduct3] = await Promise.all([
      getProduct(testHelper, ProductConstants.ShirtID),
      getProduct(testHelper, ProductConstants.JacketID),
      getProduct(testHelper, ProductConstants.MacBookPro16ID)
    ]);

    expect(afterProduct1.product?.deleted_at).not.toBeNull();
    expect(afterProduct1.options.length).toBe(0);
    expect(afterProduct1.optionValues.length).toBe(0);
    expect(afterProduct1.translations.length).toBe(0);
    expect(afterProduct1.tags.length).toBe(0);

    expect(afterProduct2.product?.deleted_at).not.toBeNull();
    expect(afterProduct2.options.length).toBe(0);
    expect(afterProduct2.optionValues.length).toBe(0);
    expect(afterProduct2.translations.length).toBe(0);
    expect(afterProduct2.tags.length).toBe(0);

    expect(afterProduct3.product?.deleted_at).not.toBeNull();
    expect(afterProduct3.options.length).toBe(0);
    expect(afterProduct3.optionValues.length).toBe(0);
    expect(afterProduct3.translations.length).toBe(0);
    expect(afterProduct3.tags.length).toBe(0);
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: SOFT_REMOVE_PRODUCTS,
        variables: {
          ids: [ProductConstants.ShirtID]
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const SOFT_REMOVE_PRODUCTS = /* GraphQL */ `
  mutation SoftRemoveProducts($ids: [ID!]!) {
    softRemoveProducts(ids: $ids)
  }
`;

const getProduct = async (testHelper: TestHelper, productId: ID) => {
  const product = await testHelper
    .getQueryBuilder()<ProductTable>(Tables.Product)
    .where('id', productId)
    .first();

  const options = await testHelper
    .getQueryBuilder()<ProductOptionTable>(Tables.ProductOption)
    .where('product_id', productId);

  const optionValues = await testHelper
    .getQueryBuilder()<OptionValueTable>(Tables.OptionValue)
    .whereIn(
      'option_id',
      options.map(po => po.option_id)
    );

  const translations = await testHelper
    .getQueryBuilder()<ProductOptionTable>(Tables.ProductTranslation)
    .where('product_id', productId);

  const tags = await testHelper
    .getQueryBuilder()<ProductOptionTable>(Tables.ProductTag)
    .where('product_id', productId);

  return {
    product,
    options,
    optionValues,
    translations,
    tags
  };
};
