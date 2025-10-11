import request from 'supertest';

import { Tables } from '@/persistence/tables';
import { VendyxServer } from '@/server';
import { TEST_VENDYX_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { ProductConstants, ProductFixtures } from './fixtures/product.fixtures';
import {
  ProductTranslationConstants,
  ProductTranslationFixtures
} from './fixtures/product-translation.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('addProductTranslation - Mutation', () => {
  const testHelper = new TestHelper();

  const vendyxServer = new VendyxServer(TEST_VENDYX_CONFIG);
  const app = vendyxServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new ProductFixtures(),
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

  test('add full product translation', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: ADD_PRODUCT_TRANSLATION_MUTATION,
        variables: {
          id: ProductConstants.ID,
          input: {
            name: 'Product name in english',
            description: 'One of the biggest creation of humanity',
            locale: 'en'
          }
        }
      });

    const { addProductTranslation } = res.body.data;

    expect(addProductTranslation.slug).toBe('product-name-in-english');
    expect(addProductTranslation.name).toBe('Product name in english');
    expect(addProductTranslation.description).toBe('One of the biggest creation of humanity');
  });

  test('add partial product translation', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: ADD_PRODUCT_TRANSLATION_MUTATION,
        variables: {
          id: ProductConstants.ID,
          input: {
            description: 'Product description in english',
            locale: 'en'
          }
        }
      });

    const { addProductTranslation } = res.body.data;

    expect(addProductTranslation.slug).toBe(null);
    expect(addProductTranslation.name).toBe(null);
    expect(addProductTranslation.description).toBe('Product description in english');
  });

  test('sets a null translation', async () => {
    const translation = await testHelper
      .getQueryBuilder()(Tables.ProductTranslation)
      .where({ product_id: ProductConstants.AlreadyTranslatedID })
      .first();

    expect(translation.name).toBe(ProductTranslationConstants.Name);
    expect(translation.description).toBe(ProductTranslationConstants.Description);

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_vendyx_shop_id', ShopConstants.ID)
      .send({
        query: ADD_PRODUCT_TRANSLATION_MUTATION,
        variables: {
          id: ProductConstants.AlreadyTranslatedID,
          input: {
            name: null,
            description: null,
            locale: 'en'
          }
        }
      });

    const { addProductTranslation } = res.body.data;

    expect(addProductTranslation.name).toBe(null);
    expect(addProductTranslation.description).toBe(null);
    expect(addProductTranslation.slug).toBe(ProductTranslationConstants.Slug);
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: ADD_PRODUCT_TRANSLATION_MUTATION,
        variables: {
          id: ProductConstants.ID,
          input: {
            locale: 'en'
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const ADD_PRODUCT_TRANSLATION_MUTATION = /* GraphQL */ `
  mutation AddProductTranslation($id: ID!, $input: AddProductTranslationInput!) {
    addProductTranslation(id: $id, input: $input) {
      id
      name
      slug
      description
    }
  }
`;
