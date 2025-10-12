import request from 'supertest';

import { convertToCent } from '@vendyx/common';

import type { ProductTable } from '@/persistence/entities/product';
import { Tables } from '@/persistence/tables';
import { VendyxServer } from '@/server';
import { TEST_VENDYX_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { AssetConstants, AssetFixtures } from './fixtures/asset.fixtures';
import { OptionFixtures } from './fixtures/option.fixtures';
import { OptionValueConstants, OptionValueFixtures } from './fixtures/option-value.fixtures';
import { ProductConstants, ProductFixtures } from './fixtures/product.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('createVariant - Mutation', () => {
  const testHelper = new TestHelper();

  const vendyxServer = new VendyxServer(TEST_VENDYX_CONFIG);
  const app = vendyxServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new AssetFixtures(),
      new ProductFixtures(),
      new OptionFixtures(),
      new OptionValueFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await vendyxServer.teardown();
  });

  test('creates variants with only required fields', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_VARIANT_MUTATION,
        variables: {
          productId: ProductConstants.ID,
          input: [{ salePrice: 1_800 }, { salePrice: 2_300 }]
        }
      });

    const { createVariant } = res.body.data;

    expect(createVariant[0].salePrice).toBe(convertToCent(1_800));
    expect(createVariant[1].salePrice).toBe(convertToCent(2_300));
  });

  test('creates simple variants', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_VARIANT_MUTATION,
        variables: {
          productId: ProductConstants.ID,
          input: [
            {
              salePrice: 1_800,
              stock: 12,
              sku: 'SKU-625',
              comparisonPrice: 2_000,
              costPerUnit: 1_500,
              requiresShipping: true,
              weight: 1.6,
              dimensions: {
                length: 1,
                width: 1,
                height: 1
              }
            },
            {
              salePrice: 2_300,
              stock: 12,
              sku: 'SKU-625',
              comparisonPrice: 2_800,
              costPerUnit: 2_000,
              requiresShipping: true,
              weight: 2.1,
              dimensions: {
                length: 1.4,
                width: 1.4,
                height: 1.4
              }
            }
          ]
        }
      });

    const { createVariant } = res.body.data;

    expect(createVariant[0]).toMatchObject({
      sku: 'SKU-625',
      salePrice: convertToCent(1_800),
      stock: 12,
      comparisonPrice: convertToCent(2_000),
      costPerUnit: convertToCent(1_500),
      requiresShipping: true,
      weight: 1.6,
      dimensions: {
        length: 1,
        width: 1,
        height: 1
      }
    });
    expect(createVariant[1]).toMatchObject({
      sku: 'SKU-625',
      salePrice: convertToCent(2_300),
      stock: 12,
      comparisonPrice: convertToCent(2_800),
      costPerUnit: convertToCent(2_000),
      requiresShipping: true,
      weight: 2.1,
      dimensions: {
        length: 1.4,
        width: 1.4,
        height: 1.4
      }
    });
  });

  test('creates variants with assets', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_VARIANT_MUTATION,
        variables: {
          productId: ProductConstants.ID,
          input: [
            {
              salePrice: 1_800,
              assets: [
                { id: AssetConstants.ImageID, order: 0 },
                { id: AssetConstants.MeImageID, order: 1 }
              ]
            },
            {
              salePrice: 2_300,
              assets: [
                { id: AssetConstants.MeImageID, order: 0 },
                { id: AssetConstants.ImageID, order: 1 }
              ]
            }
          ]
        }
      });

    const { createVariant } = res.body.data;

    expect(createVariant[0].assets.items).toHaveLength(2);
    expect(createVariant[0].assets.items[0].id).toBe(AssetConstants.ImageID);
    expect(createVariant[0].assets.items[1].id).toBe(AssetConstants.MeImageID);

    expect(createVariant[1].assets.items).toHaveLength(2);
    expect(createVariant[1].assets.items[0].id).toBe(AssetConstants.MeImageID);
    expect(createVariant[1].assets.items[1].id).toBe(AssetConstants.ImageID);
  });

  test('creates variants with option values', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_VARIANT_MUTATION,
        variables: {
          productId: ProductConstants.ID,
          input: [
            {
              salePrice: 1_800,
              optionValues: [
                OptionValueConstants.BlueOptionValueID,
                OptionValueConstants.LargeOptionValueID,
                OptionValueConstants.PolyesterOptionValueID
              ]
            },
            {
              salePrice: 2_300,
              optionValues: [
                OptionValueConstants.GreenOptionValueID,
                OptionValueConstants.MediumOptionValueID,
                OptionValueConstants.CottonOptionValueID
              ]
            }
          ]
        }
      });

    const { createVariant } = res.body.data;

    expect(createVariant[0].optionValues).toHaveLength(3);
    expect(createVariant[0].optionValues[0].id).toBe(OptionValueConstants.BlueOptionValueID);
    expect(createVariant[0].optionValues[1].id).toBe(OptionValueConstants.LargeOptionValueID);
    expect(createVariant[0].optionValues[2].id).toBe(OptionValueConstants.PolyesterOptionValueID);

    expect(createVariant[1].optionValues).toHaveLength(3);
    expect(createVariant[1].optionValues[0].id).toBe(OptionValueConstants.GreenOptionValueID);
    expect(createVariant[1].optionValues[1].id).toBe(OptionValueConstants.MediumOptionValueID);
    expect(createVariant[1].optionValues[2].id).toBe(OptionValueConstants.CottonOptionValueID);
  });

  test('updates min and max product sale price', async () => {
    await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_VARIANT_MUTATION,
        variables: {
          productId: ProductConstants.ID,
          input: [{ salePrice: 1_800 }, { salePrice: 2_300 }, { salePrice: 5_600 }]
        }
      });

    const [product] = await testHelper
      .getQueryBuilder()<ProductTable>(Tables.Product)
      .select('*')
      .where({ id: ProductConstants.ID });

    expect(product.min_sale_price).toBe(convertToCent(1_800));
    expect(product.max_sale_price).toBe(convertToCent(5_600));
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: CREATE_VARIANT_MUTATION,
        variables: {
          productId: ProductConstants.ID,
          input: [{ salePrice: 1_800 }, { salePrice: 2_300 }]
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const CREATE_VARIANT_MUTATION = /* GraphQL */ `
  mutation CreateVariants($productId: ID!, $input: [CreateVariantInput!]!) {
    createVariant(productId: $productId, input: $input) {
      id
      createdAt
      updatedAt
      sku
      salePrice
      stock
      comparisonPrice
      costPerUnit
      requiresShipping
      weight
      dimensions {
        length
        width
        height
      }
      assets {
        items {
          id
          source
        }
      }
      optionValues {
        id
        name
      }
    }
  }
`;
