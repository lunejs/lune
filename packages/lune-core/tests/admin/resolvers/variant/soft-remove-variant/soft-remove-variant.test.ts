import request from 'supertest';

import type { VariantTable } from '@/persistence/entities/variant';
import { Tables } from '@/persistence/tables';
import { VendyxServer } from '@/server';
import { TEST_VENDYX_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { AssetFixtures } from './fixtures/asset.fixtures';
import { OptionFixtures } from './fixtures/option.fixtures';
import { OptionValueFixtures } from './fixtures/option-value.fixtures';
import { ProductFixtures } from './fixtures/product.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';
import { VariantConstants, VariantFixtures } from './fixtures/variant.fixtures';
import { VariantAssetFixtures } from './fixtures/variant-asset.fixtures';
import { VariantOptionValueFixtures } from './fixtures/variant-option-value.fixtures';

describe('softRemove - Mutation', () => {
  const testHelper = new TestHelper();

  const vendyxServer = new VendyxServer(TEST_VENDYX_CONFIG);
  const app = vendyxServer.getApp();

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
    await vendyxServer.teardown();
  });

  test('soft removes simple variant fields', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: SOFT_REMOVE_VARIANT,
        variables: {
          id: VariantConstants.ID
        }
      });

    const { softRemoveVariant } = res.body.data;

    expect(softRemoveVariant.id).toBe(VariantConstants.ID);

    const variant = await testHelper
      .getQueryBuilder()<VariantTable>(Tables.Variant)
      .where({ id: VariantConstants.ID })
      .first();

    expect(variant?.deleted_at).not.toBeFalsy();
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: SOFT_REMOVE_VARIANT,
        variables: {
          id: VariantConstants.ID
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const SOFT_REMOVE_VARIANT = /* GraphQL */ `
  mutation SoftRemoveVariant($id: ID!) {
    softRemoveVariant(id: $id) {
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
