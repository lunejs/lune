import { convertToCent } from '@lunejs/common';
import request from 'supertest';

import type { ProductTable } from '@/persistence/entities/product';
import { Tables } from '@/persistence/tables';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { AssetConstants, AssetFixtures } from './fixtures/asset.fixtures';
import { OptionFixtures } from './fixtures/option.fixtures';
import { OptionValueConstants, OptionValueFixtures } from './fixtures/option-value.fixtures';
import { ProductConstants, ProductFixtures } from './fixtures/product.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';
import { VariantConstants, VariantFixtures } from './fixtures/variant.fixtures';
import { VariantAssetFixtures } from './fixtures/variant-asset.fixtures';
import { VariantOptionValueFixtures } from './fixtures/variant-option-value.fixtures';

describe('updateVariant - Mutation', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new ProductFixtures(),
      new AssetFixtures(),
      new OptionFixtures(),
      new OptionValueFixtures(),
      new VariantFixtures(),
      new VariantOptionValueFixtures(),
      new VariantAssetFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('updates simple variant fields', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_VARIANT_MUTATION,
        variables: {
          id: VariantConstants.ID,
          input: {
            salePrice: 5_300,
            comparisonPrice: 6_000,
            costPerUnit: 2_800,
            sku: 'SKU-617',
            stock: 12,
            requiresShipping: true,
            weight: 2.8,
            dimensions: {
              length: 1.8,
              width: 1.8,
              height: 1.8
            }
          }
        }
      });

    const { updateVariant } = res.body.data;

    expect(updateVariant).toMatchObject({
      salePrice: convertToCent(5_300),
      comparisonPrice: convertToCent(6_000),
      costPerUnit: convertToCent(2_800),
      sku: 'SKU-617',
      stock: 12,
      requiresShipping: true,
      weight: 2.8,
      dimensions: {
        length: 1.8,
        width: 1.8,
        height: 1.8
      }
    });
  });

  test('sets optional values as falsy', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_VARIANT_MUTATION,
        variables: {
          id: VariantConstants.ID,
          input: {
            salePrice: 0,
            comparisonPrice: null,
            costPerUnit: null,
            sku: null,
            weight: null,
            dimensions: null
          }
        }
      });

    const { updateVariant } = res.body.data;

    expect(updateVariant).toMatchObject({
      salePrice: 0,
      comparisonPrice: null,
      costPerUnit: null,
      sku: null,
      weight: null,
      dimensions: null
    });
  });

  test('adds assets in variant', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_VARIANT_MUTATION,
        variables: {
          id: VariantConstants.ID,
          input: {
            assets: [
              { id: AssetConstants.ImageID, order: 0 },
              { id: AssetConstants.MeImageID, order: 1 }
            ]
          }
        }
      });

    const { updateVariant } = res.body.data;

    expect(updateVariant.assets.items[0]).toMatchObject({
      id: AssetConstants.ImageID,
      order: 0
    });
    expect(updateVariant.assets.items[1]).toMatchObject({
      id: AssetConstants.MeImageID,
      order: 1
    });
  });

  test('replaces assets in variant', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_VARIANT_MUTATION,
        variables: {
          id: VariantConstants.WithAssetsID,
          input: {
            assets: [
              { id: AssetConstants.EllieImageID, order: 0 },
              { id: AssetConstants.RainImageID, order: 1 }
            ]
          }
        }
      });

    const { updateVariant } = res.body.data;

    expect(updateVariant.assets.items[0]).toMatchObject({
      id: AssetConstants.EllieImageID,
      order: 0
    });
    expect(updateVariant.assets.items[1]).toMatchObject({
      id: AssetConstants.RainImageID,
      order: 1
    });
  });

  test('reorders assets in variant', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_VARIANT_MUTATION,
        variables: {
          id: VariantConstants.WithAssetsID,
          input: {
            assets: [
              { id: AssetConstants.MeImageID, order: 0 },
              { id: AssetConstants.ImageID, order: 1 }
            ]
          }
        }
      });

    const { updateVariant } = res.body.data;

    expect(updateVariant.assets.items[0]).toMatchObject({
      id: AssetConstants.MeImageID,
      order: 0
    });
    expect(updateVariant.assets.items[1]).toMatchObject({
      id: AssetConstants.ImageID,
      order: 1
    });
  });

  test('adds option values in variant', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_VARIANT_MUTATION,
        variables: {
          id: VariantConstants.WithAssetsID,
          input: {
            optionValues: [
              OptionValueConstants.BlueOptionValueID,
              OptionValueConstants.LargeOptionValueID,
              OptionValueConstants.PolyesterOptionValueID
            ]
          }
        }
      });

    const { updateVariant } = res.body.data;
    const opvIds = updateVariant.optionValues.map(opv => opv.id);

    expect(opvIds).toHaveLength(3);
    expect(opvIds.some(id => id === OptionValueConstants.BlueOptionValueID)).toBe(true);
    expect(opvIds.some(id => id === OptionValueConstants.LargeOptionValueID)).toBe(true);
    expect(opvIds.some(id => id === OptionValueConstants.PolyesterOptionValueID)).toBe(true);
  });

  test('removes option values in variant', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_VARIANT_MUTATION,
        variables: {
          id: VariantConstants.ID,
          input: {
            optionValues: []
          }
        }
      });

    const { updateVariant } = res.body.data;

    expect(updateVariant.optionValues).toHaveLength(0);
  });

  test('replaces option values in variant', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_VARIANT_MUTATION,
        variables: {
          id: VariantConstants.ID,
          input: {
            optionValues: [OptionValueConstants.PolyesterOptionValueID]
          }
        }
      });

    const { updateVariant } = res.body.data;
    const opvIds = updateVariant.optionValues.map(opv => opv.id);

    expect(opvIds).toHaveLength(1);
    expect(opvIds[0]).toBe(OptionValueConstants.PolyesterOptionValueID);
  });

  test('updates max sale price for product when adding a variant with a higher sale price', async () => {
    await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_VARIANT_MUTATION,
        variables: {
          id: VariantConstants.WithAssetsID,
          input: {
            salePrice: 3_000
          }
        }
      });

    const [product] = await testHelper
      .getQueryBuilder()<ProductTable>(Tables.Product)
      .select('*')
      .where({ id: ProductConstants.ID });

    expect(product.min_sale_price).toBe(convertToCent(2_300));
    expect(product.max_sale_price).toBe(convertToCent(3_000));
  });

  test('updates min sale price for product when adding a variant with a lower sale price', async () => {
    await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_VARIANT_MUTATION,
        variables: {
          id: VariantConstants.WithAssetsID,
          input: {
            salePrice: 1_200
          }
        }
      });

    const [product] = await testHelper
      .getQueryBuilder()<ProductTable>(Tables.Product)
      .select('*')
      .where({ id: ProductConstants.ID });

    expect(product.min_sale_price).toBe(convertToCent(1_200));
    expect(product.max_sale_price).toBe(convertToCent(2_300));
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: UPDATE_VARIANT_MUTATION,
        variables: {
          id: VariantConstants.ID,
          input: { salePrice: 1 }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const UPDATE_VARIANT_MUTATION = /* GraphQL */ `
  mutation UpdateVariants($id: ID!, $input: UpdateVariantInput!) {
    updateVariant(id: $id, input: $input) {
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
          order
        }
      }
      optionValues {
        id
        name
      }
    }
  }
`;
