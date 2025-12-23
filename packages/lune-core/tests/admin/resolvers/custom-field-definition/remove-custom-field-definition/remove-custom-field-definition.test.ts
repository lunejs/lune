import request from 'supertest';

import type { CustomFieldDefinitionTable } from '@/persistence/entities/custom-field-definition';
import type { ID } from '@/persistence/entities/entity';
import type { ProductCustomFieldTable } from '@/persistence/entities/product-custom-field';
import type { ProductCustomFieldTranslationTable } from '@/persistence/entities/product-custom-field-translation';
import { Tables } from '@/persistence/tables';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import {
  CustomFieldDefinitionConstants,
  CustomFieldDefinitionFixtures
} from './fixtures/custom-field-definition.fixtures';
import { ProductFixtures } from './fixtures/product.fixtures';
import {
  ProductCustomFieldConstants,
  ProductCustomFieldFixtures
} from './fixtures/product-custom-field.fixtures';
import {
  ProductCustomFieldTranslationConstants,
  ProductCustomFieldTranslationFixtures
} from './fixtures/product-custom-field-translation.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('removeCustomFieldDefinition - Mutation', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new ProductFixtures(),
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

  test('removes a custom field definition', async () => {
    const prevField = await getCustomFieldDefinition(
      testHelper,
      CustomFieldDefinitionConstants.ToRemoveID
    );

    expect(prevField).toBeDefined();

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: REMOVE_CUSTOM_FIELD_DEFINITION_MUTATION,
        variables: {
          id: CustomFieldDefinitionConstants.ToRemoveID
        }
      });

    const { removeCustomFieldDefinition } = res.body.data;

    expect(removeCustomFieldDefinition).toBe(true);

    const afterField = await getCustomFieldDefinition(
      testHelper,
      CustomFieldDefinitionConstants.ToRemoveID
    );

    expect(afterField).toBeUndefined();
  });

  test('does not affect other custom field definitions', async () => {
    await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: REMOVE_CUSTOM_FIELD_DEFINITION_MUTATION,
        variables: {
          id: CustomFieldDefinitionConstants.ToRemoveID
        }
      });

    const otherField = await getCustomFieldDefinition(
      testHelper,
      CustomFieldDefinitionConstants.AnotherFieldID
    );

    expect(otherField).toBeDefined();
  });

  test('removes associated product custom fields when definition is removed', async () => {
    // Verify product custom field exists before removal
    const prevProductCustomField = await getProductCustomField(
      testHelper,
      ProductCustomFieldConstants.FieldToRemoveValueID
    );
    expect(prevProductCustomField).toBeDefined();

    await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: REMOVE_CUSTOM_FIELD_DEFINITION_MUTATION,
        variables: {
          id: CustomFieldDefinitionConstants.ToRemoveID
        }
      });

    // Product custom field should be removed
    const afterProductCustomField = await getProductCustomField(
      testHelper,
      ProductCustomFieldConstants.FieldToRemoveValueID
    );
    expect(afterProductCustomField).toBeUndefined();

    // Other product custom fields should not be affected
    const otherProductCustomField = await getProductCustomField(
      testHelper,
      ProductCustomFieldConstants.AnotherFieldValueID
    );
    expect(otherProductCustomField).toBeDefined();
  });

  test('removes associated product custom field translations when definition is removed', async () => {
    // Verify translation exists before removal
    const prevTranslation = await getProductCustomFieldTranslation(
      testHelper,
      ProductCustomFieldTranslationConstants.TranslationToRemoveID
    );
    expect(prevTranslation).toBeDefined();

    await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: REMOVE_CUSTOM_FIELD_DEFINITION_MUTATION,
        variables: {
          id: CustomFieldDefinitionConstants.ToRemoveID
        }
      });

    // Translation should be removed
    const afterTranslation = await getProductCustomFieldTranslation(
      testHelper,
      ProductCustomFieldTranslationConstants.TranslationToRemoveID
    );
    expect(afterTranslation).toBeUndefined();

    // Other translations should not be affected
    const otherTranslation = await getProductCustomFieldTranslation(
      testHelper,
      ProductCustomFieldTranslationConstants.AnotherTranslationID
    );
    expect(otherTranslation).toBeDefined();
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: REMOVE_CUSTOM_FIELD_DEFINITION_MUTATION,
        variables: {
          id: CustomFieldDefinitionConstants.ToRemoveID
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const REMOVE_CUSTOM_FIELD_DEFINITION_MUTATION = /* GraphQL */ `
  mutation RemoveCustomFieldDefinition($id: ID!) {
    removeCustomFieldDefinition(id: $id)
  }
`;

const getCustomFieldDefinition = async (testHelper: TestUtils, id: ID) => {
  return await testHelper
    .getQueryBuilder()<CustomFieldDefinitionTable>(Tables.CustomFieldDefinition)
    .where('id', id)
    .first();
};

const getProductCustomField = async (testHelper: TestUtils, id: ID) => {
  return await testHelper
    .getQueryBuilder()<ProductCustomFieldTable>(Tables.ProductCustomField)
    .where('id', id)
    .first();
};

const getProductCustomFieldTranslation = async (testHelper: TestUtils, id: ID) => {
  return await testHelper
    .getQueryBuilder()<ProductCustomFieldTranslationTable>(Tables.ProductCustomFieldTranslation)
    .where('id', id)
    .first();
};
