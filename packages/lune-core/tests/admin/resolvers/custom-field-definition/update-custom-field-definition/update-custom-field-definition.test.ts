import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import {
  CustomFieldDefinitionConstants,
  CustomFieldDefinitionFixtures
} from './fixtures/custom-field-definition.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('updateCustomFieldDefinition - Mutation', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new CustomFieldDefinitionFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('updates custom field definition name', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_CUSTOM_FIELD_DEFINITION_MUTATION,
        variables: {
          id: CustomFieldDefinitionConstants.TextFieldID,
          input: {
            name: 'Updated Name',
            order: 0
          }
        }
      });

    const { updateCustomFieldDefinition } = res.body.data;

    expect(updateCustomFieldDefinition.id).toBe(CustomFieldDefinitionConstants.TextFieldID);
    expect(updateCustomFieldDefinition.name).toBe('Updated Name');
    expect(updateCustomFieldDefinition.key).toBe('original_name');
  });

  test('updates custom field definition order', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_CUSTOM_FIELD_DEFINITION_MUTATION,
        variables: {
          id: CustomFieldDefinitionConstants.TextFieldID,
          input: {
            name: 'Original Name',
            order: 5
          }
        }
      });

    const { updateCustomFieldDefinition } = res.body.data;

    expect(updateCustomFieldDefinition.id).toBe(CustomFieldDefinitionConstants.TextFieldID);
    expect(updateCustomFieldDefinition.order).toBe(5);
  });

  test('preserves other fields when updating name', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_CUSTOM_FIELD_DEFINITION_MUTATION,
        variables: {
          id: CustomFieldDefinitionConstants.ReferenceFieldID,
          input: {
            name: 'Updated Reference Name',
            order: 1
          }
        }
      });

    const { updateCustomFieldDefinition } = res.body.data;

    expect(updateCustomFieldDefinition.name).toBe('Updated Reference Name');
    expect(updateCustomFieldDefinition.key).toBe('related_products');
    expect(updateCustomFieldDefinition.isList).toBe(true);
    expect(updateCustomFieldDefinition.type).toBe('PRODUCT_REFERENCE');
    expect(updateCustomFieldDefinition.order).toBe(1);
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: UPDATE_CUSTOM_FIELD_DEFINITION_MUTATION,
        variables: {
          id: CustomFieldDefinitionConstants.TextFieldID,
          input: {
            name: 'No Auth Update',
            order: 0
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const UPDATE_CUSTOM_FIELD_DEFINITION_MUTATION = /* GraphQL */ `
  mutation UpdateCustomFieldDefinition($id: ID!, $input: UpdateCustomFieldInput!) {
    updateCustomFieldDefinition(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      name
      key
      isList
      appliesToEntity
      type
      metadata
      order
    }
  }
`;
