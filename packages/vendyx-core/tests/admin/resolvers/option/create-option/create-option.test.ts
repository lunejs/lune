import request from 'supertest';

import type { ProductOptionTable } from '@/persistence/entities/product-option';
import { Tables } from '@/persistence/tables';
import { VendyxServer } from '@/server';
import { TEST_VENDYX_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { OptionFixtures } from './fixtures/option.fixtures';
import { OptionValueFixtures } from './fixtures/option-value.fixtures';
import { ProductConstants, ProductFixtures } from './fixtures/product.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('createOption - Mutation', () => {
  const testHelper = new TestHelper();

  const vendyxServer = new VendyxServer(TEST_VENDYX_CONFIG);
  const app = vendyxServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
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

  test('creates simple options', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_OPTION_MUTATION,
        variables: {
          productId: ProductConstants.ID,
          input: [
            {
              order: 0,
              name: 'New Option',
              values: []
            }
          ]
        }
      });

    const { createOption } = res.body.data;

    expect(createOption[0].name).toBe('New Option');
  });

  test('creates options with values', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_OPTION_MUTATION,
        variables: {
          productId: ProductConstants.ID,
          input: [
            {
              order: 0,
              name: 'Size',
              values: [
                { order: 0, name: 'XS' },
                { order: 1, name: 'S' },
                { order: 2, name: 'M' }
              ]
            },
            {
              order: 1,
              name: 'Color',
              values: [
                { order: 0, name: 'Green' },
                { order: 1, name: 'Blue' },
                { order: 2, name: 'Red' }
              ]
            }
          ]
        }
      });

    const { createOption } = res.body.data;

    expect(createOption[0]).toMatchObject({
      name: 'Size',
      values: [{ name: 'XS' }, { name: 'S' }, { name: 'M' }]
    });

    expect(createOption[1]).toMatchObject({
      name: 'Color',
      values: [{ name: 'Green' }, { name: 'Blue' }, { name: 'Red' }]
    });

    const productOptions = await testHelper
      .getQueryBuilder()<ProductOptionTable>(Tables.ProductOption)
      .where({ product_id: ProductConstants.ID });

    expect(productOptions).toHaveLength(2);
  });

  test('returns Authorization error when no token is provided', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_OPTION_MUTATION,
        variables: {
          productId: ProductConstants.ID,
          input: [
            {
              order: 0,
              name: 'New Option',
              values: []
            }
          ]
        }
      });

    expect(res.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const CREATE_OPTION_MUTATION = /* GraphQL */ `
  mutation CreateOptionMutation($productId: ID!, $input: [CreateOptionInput!]!) {
    createOption(productId: $productId, input: $input) {
      id
      name
      values {
        id
        name
      }
    }
  }
`;
