import request from 'supertest';

import type { OptionTranslationTable } from '@/persistence/entities/option-translation';
import type { OptionValueTranslationTable } from '@/persistence/entities/option-value-translation';
import type { ProductCustomFieldTranslationTable } from '@/persistence/entities/product-custom-field-translation';
import { Tables } from '@/persistence/tables';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomFieldDefinitionFixtures } from './fixtures/custom-field-definition.fixtures';
import { OptionConstants, OptionFixtures } from './fixtures/option.fixtures';
import {
  OptionTranslationConstants,
  OptionTranslationFixtures
} from './fixtures/option-translation.fixtures';
import { OptionValueConstants, OptionValueFixtures } from './fixtures/option-value.fixtures';
import { OptionValueTranslationFixtures } from './fixtures/option-value-translation.fixtures';
import { ProductConstants, ProductFixtures } from './fixtures/product.fixtures';
import {
  ProductCustomFieldConstants,
  ProductCustomFieldFixtures
} from './fixtures/product-custom-field.fixtures';
import {
  ProductCustomFieldTranslationConstants,
  ProductCustomFieldTranslationFixtures
} from './fixtures/product-custom-field-translation.fixtures';
import {
  ProductTranslationConstants,
  ProductTranslationFixtures
} from './fixtures/product-translation.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('addProductTranslation - Mutation', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new ProductFixtures(),
      new ProductTranslationFixtures(),
      new OptionFixtures(),
      new OptionValueFixtures(),
      new OptionTranslationFixtures(),
      new OptionValueTranslationFixtures(),
      new CustomFieldDefinitionFixtures(),
      new ProductCustomFieldFixtures(),
      new ProductCustomFieldTranslationFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('add full product translation', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
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
      .set('x_lune_shop_id', ShopConstants.ID)
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
      .set('x_lune_shop_id', ShopConstants.ID)
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

  test('add new option translation', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ADD_PRODUCT_TRANSLATION_MUTATION,
        variables: {
          id: ProductConstants.ID,
          input: {
            locale: 'en',
            options: [
              { id: OptionConstants.MaterialOptionID, name: 'Material English' },
              { id: OptionConstants.JacketColorOptionID, name: 'Jacket English' }
            ]
          }
        }
      });

    const { addProductTranslation } = res.body.data;

    expect(addProductTranslation).toBeDefined();

    const optionTranslations = await testHelper
      .getQueryBuilder()<OptionTranslationTable>(Tables.OptionTranslation)
      .whereIn('option_id', [
        OptionConstants.MaterialOptionID,
        OptionConstants.JacketColorOptionID
      ]);

    expect(
      optionTranslations.find(o => o.option_id === OptionConstants.MaterialOptionID)?.name
    ).toBe('Material English');
    expect(
      optionTranslations.find(o => o.option_id === OptionConstants.JacketColorOptionID)?.name
    ).toBe('Jacket English');
  });

  test('update option translation', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ADD_PRODUCT_TRANSLATION_MUTATION,
        variables: {
          id: ProductConstants.ID,
          input: {
            locale: 'en',
            options: [
              { id: OptionConstants.ColorOptionID, name: 'Color new translation' },
              { id: OptionConstants.SizeOptionID, name: 'Size new translation' }
            ]
          }
        }
      });

    const { addProductTranslation } = res.body.data;

    expect(addProductTranslation).toBeDefined();

    const optionTranslations = await testHelper
      .getQueryBuilder()<OptionTranslationTable>(Tables.OptionTranslation)
      .whereIn('option_id', [OptionConstants.ColorOptionID, OptionConstants.SizeOptionID]);

    expect(optionTranslations.find(o => o.option_id === OptionConstants.ColorOptionID)?.name).toBe(
      'Color new translation'
    );
    expect(optionTranslations.find(o => o.option_id === OptionConstants.SizeOptionID)?.name).toBe(
      'Size new translation'
    );
  });

  test('set null option translation', async () => {
    const translations = await testHelper
      .getQueryBuilder()<OptionTranslationTable>(Tables.OptionTranslation)
      .whereIn('option_id', [OptionConstants.ColorOptionID, OptionConstants.SizeOptionID]);

    expect(translations.find(t => t.option_id === OptionConstants.ColorOptionID)?.name).toBe(
      OptionTranslationConstants.ColorTranslatedName
    );
    expect(translations.find(t => t.option_id === OptionConstants.SizeOptionID)?.name).toBe(
      OptionTranslationConstants.SizeTranslatedName
    );

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ADD_PRODUCT_TRANSLATION_MUTATION,
        variables: {
          id: ProductConstants.ID,
          input: {
            locale: 'en',
            options: [
              { id: OptionConstants.ColorOptionID, name: null },
              { id: OptionConstants.SizeOptionID, name: null }
            ]
          }
        }
      });

    const { addProductTranslation } = res.body.data;

    expect(addProductTranslation).toBeDefined();

    const optionTranslations = await testHelper
      .getQueryBuilder()<OptionTranslationTable>(Tables.OptionTranslation)
      .whereIn('option_id', [OptionConstants.ColorOptionID, OptionConstants.SizeOptionID]);

    expect(optionTranslations.find(o => o.option_id === OptionConstants.ColorOptionID)?.name).toBe(
      null
    );
    expect(optionTranslations.find(o => o.option_id === OptionConstants.SizeOptionID)?.name).toBe(
      null
    );
  });

  test('add new option value translation', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ADD_PRODUCT_TRANSLATION_MUTATION,
        variables: {
          id: ProductConstants.ID,
          input: {
            locale: 'en',
            optionValues: [
              { id: OptionValueConstants.JackedRedOptionValueID, name: 'Jacket red english' },
              { id: OptionValueConstants.PolyesterOptionValueID, name: 'Polyester english' }
            ]
          }
        }
      });

    const { addProductTranslation } = res.body.data;

    expect(addProductTranslation).toBeDefined();

    const optionValueTranslations = await testHelper
      .getQueryBuilder()<OptionValueTranslationTable>(Tables.OptionValueTranslation)
      .whereIn('option_value_id', [
        OptionValueConstants.JackedRedOptionValueID,
        OptionValueConstants.PolyesterOptionValueID
      ]);

    expect(
      optionValueTranslations.find(
        o => o.option_value_id === OptionValueConstants.JackedRedOptionValueID
      )?.name
    ).toBe('Jacket red english');
    expect(
      optionValueTranslations.find(
        o => o.option_value_id === OptionValueConstants.PolyesterOptionValueID
      )?.name
    ).toBe('Polyester english');
  });

  test('update option value translation', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ADD_PRODUCT_TRANSLATION_MUTATION,
        variables: {
          id: ProductConstants.ID,
          input: {
            locale: 'en',
            optionValues: [
              { id: OptionValueConstants.BlueOptionValueID, name: 'new Blue name' },
              { id: OptionValueConstants.SmallOptionValueID, name: 'new Small name' }
            ]
          }
        }
      });

    const { addProductTranslation } = res.body.data;

    expect(addProductTranslation).toBeDefined();

    const optionValueTranslations = await testHelper
      .getQueryBuilder()<OptionValueTranslationTable>(Tables.OptionValueTranslation)
      .whereIn('option_value_id', [
        OptionValueConstants.BlueOptionValueID,
        OptionValueConstants.SmallOptionValueID
      ]);

    expect(
      optionValueTranslations.find(
        o => o.option_value_id === OptionValueConstants.BlueOptionValueID
      )?.name
    ).toBe('new Blue name');
    expect(
      optionValueTranslations.find(
        o => o.option_value_id === OptionValueConstants.SmallOptionValueID
      )?.name
    ).toBe('new Small name');
  });

  test('update option value translation', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ADD_PRODUCT_TRANSLATION_MUTATION,
        variables: {
          id: ProductConstants.ID,
          input: {
            locale: 'en',
            optionValues: [
              { id: OptionValueConstants.BlueOptionValueID, name: null },
              { id: OptionValueConstants.SmallOptionValueID, name: null }
            ]
          }
        }
      });

    const { addProductTranslation } = res.body.data;

    expect(addProductTranslation).toBeDefined();

    const optionValueTranslations = await testHelper
      .getQueryBuilder()<OptionValueTranslationTable>(Tables.OptionValueTranslation)
      .whereIn('option_value_id', [
        OptionValueConstants.BlueOptionValueID,
        OptionValueConstants.SmallOptionValueID
      ]);

    expect(
      optionValueTranslations.find(
        o => o.option_value_id === OptionValueConstants.BlueOptionValueID
      )?.name
    ).toBe(null);
    expect(
      optionValueTranslations.find(
        o => o.option_value_id === OptionValueConstants.SmallOptionValueID
      )?.name
    ).toBe(null);
  });

  test('add new custom field translation', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ADD_PRODUCT_TRANSLATION_MUTATION,
        variables: {
          id: ProductConstants.ID,
          input: {
            locale: 'en',
            customFields: [
              { id: ProductCustomFieldConstants.MaterialFieldID, value: 'Cotton translated' },
              {
                id: ProductCustomFieldConstants.CareInstructionsFieldID,
                value: 'Hand wash only translated'
              }
            ]
          }
        }
      });

    const { addProductTranslation } = res.body.data;

    expect(addProductTranslation).toBeDefined();

    const customFieldTranslations = await testHelper
      .getQueryBuilder()<ProductCustomFieldTranslationTable>(Tables.ProductCustomFieldTranslation)
      .whereIn('field_id', [
        ProductCustomFieldConstants.MaterialFieldID,
        ProductCustomFieldConstants.CareInstructionsFieldID
      ]);

    expect(
      customFieldTranslations.find(t => t.field_id === ProductCustomFieldConstants.MaterialFieldID)
        ?.value
    ).toBe('Cotton translated');
    expect(
      customFieldTranslations.find(
        t => t.field_id === ProductCustomFieldConstants.CareInstructionsFieldID
      )?.value
    ).toBe('Hand wash only translated');
  });

  test('update custom field translation', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ADD_PRODUCT_TRANSLATION_MUTATION,
        variables: {
          id: ProductConstants.AlreadyTranslatedID,
          input: {
            locale: 'en',
            name: 'test',
            customFields: [
              {
                id: ProductCustomFieldConstants.AlreadyTranslatedMaterialFieldID,
                value: 'Updated polyester translation'
              }
            ]
          }
        }
      });

    const { addProductTranslation } = res.body.data;

    expect(addProductTranslation).toBeDefined();

    const customFieldTranslation = await testHelper
      .getQueryBuilder()<ProductCustomFieldTranslationTable>(Tables.ProductCustomFieldTranslation)
      .where('field_id', ProductCustomFieldConstants.AlreadyTranslatedMaterialFieldID)
      .first();

    expect(customFieldTranslation?.value).toBe('Updated polyester translation');
  });

  test('set null custom field translation', async () => {
    const translation = await testHelper
      .getQueryBuilder()<ProductCustomFieldTranslationTable>(Tables.ProductCustomFieldTranslation)
      .where('field_id', ProductCustomFieldConstants.AlreadyTranslatedMaterialFieldID)
      .first();

    expect(translation?.value).toBe(
      ProductCustomFieldTranslationConstants.AlreadyTranslatedMaterialValue
    );

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ADD_PRODUCT_TRANSLATION_MUTATION,
        variables: {
          id: ProductConstants.AlreadyTranslatedID,
          input: {
            locale: 'en',
            name: 'test',
            customFields: [
              {
                id: ProductCustomFieldConstants.AlreadyTranslatedMaterialFieldID,
                value: null
              }
            ]
          }
        }
      });

    const { addProductTranslation } = res.body.data;

    expect(addProductTranslation).toBeDefined();

    const updatedTranslation = await testHelper
      .getQueryBuilder()<ProductCustomFieldTranslationTable>(Tables.ProductCustomFieldTranslation)
      .where('field_id', ProductCustomFieldConstants.AlreadyTranslatedMaterialFieldID)
      .first();

    expect(updatedTranslation?.value).toBe(null);
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
