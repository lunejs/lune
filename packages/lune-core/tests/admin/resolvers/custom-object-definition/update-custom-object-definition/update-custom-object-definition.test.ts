import request from 'supertest';

import { Tables } from '@/persistence/tables';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import {
  CustomFieldDefinitionConstants,
  CustomFieldDefinitionFixtures
} from './fixtures/custom-field-definition.fixtures';
import {
  CustomObjectDefinitionConstants,
  CustomObjectDefinitionFixtures
} from './fixtures/custom-object-definition.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('updateCustomObjectDefinition - Mutation', () => {
  const testHelper = new TestUtils();
  const q = testHelper.getQueryBuilder();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new CustomObjectDefinitionFixtures(),
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

  test('updates custom object definition name and key', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_CUSTOM_OBJECT_DEFINITION_MUTATION,
        variables: {
          id: CustomObjectDefinitionConstants.FirstID,
          input: {
            name: 'Article'
          }
        }
      });

    const {
      updateCustomObjectDefinition: { customObjectDefinition, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(customObjectDefinition.id).toBe(CustomObjectDefinitionConstants.FirstID);
    expect(customObjectDefinition.name).toBe('Article');
    expect(customObjectDefinition.key).toBe('article');

    const inDb = await q(Tables.CustomObjectDefinition)
      .where({ id: CustomObjectDefinitionConstants.FirstID })
      .first();

    expect(inDb.name).toBe('Article');
    expect(inDb.key).toBe('article');
  });

  test('updates field names', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_CUSTOM_OBJECT_DEFINITION_MUTATION,
        variables: {
          id: CustomObjectDefinitionConstants.FirstID,
          input: {
            fields: [
              {
                id: CustomFieldDefinitionConstants.TitleFieldID,
                name: 'Updated Title'
              },
              {
                id: CustomFieldDefinitionConstants.ContentFieldID,
                name: 'Updated Content'
              }
            ]
          }
        }
      });

    const {
      updateCustomObjectDefinition: { customObjectDefinition, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(customObjectDefinition).not.toBeNull();

    const fieldsInDb = await q(Tables.CustomFieldDefinition).whereIn('id', [
      CustomFieldDefinitionConstants.TitleFieldID,
      CustomFieldDefinitionConstants.ContentFieldID
    ]);

    expect(fieldsInDb.find(f => f.id === CustomFieldDefinitionConstants.TitleFieldID).name).toBe(
      'Updated Title'
    );
    expect(fieldsInDb.find(f => f.id === CustomFieldDefinitionConstants.ContentFieldID).name).toBe(
      'Updated Content'
    );
  });

  test('updates both name and fields', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_CUSTOM_OBJECT_DEFINITION_MUTATION,
        variables: {
          id: CustomObjectDefinitionConstants.FirstID,
          input: {
            name: 'Updated Blog',
            fields: [
              {
                id: CustomFieldDefinitionConstants.TitleFieldID,
                name: 'New Title'
              }
            ]
          }
        }
      });

    const {
      updateCustomObjectDefinition: { customObjectDefinition, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(customObjectDefinition.name).toBe('Updated Blog');
    expect(customObjectDefinition.key).toBe('updated_blog');

    const fieldInDb = await q(Tables.CustomFieldDefinition)
      .where({ id: CustomFieldDefinitionConstants.TitleFieldID })
      .first();

    expect(fieldInDb.name).toBe('New Title');
  });

  test('updates displayFieldId by displayFieldName', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_CUSTOM_OBJECT_DEFINITION_MUTATION,
        variables: {
          id: CustomObjectDefinitionConstants.FirstID,
          input: {
            displayFieldName: 'Title'
          }
        }
      });

    const {
      updateCustomObjectDefinition: { customObjectDefinition, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(customObjectDefinition.displayFieldId).toBe(CustomFieldDefinitionConstants.TitleFieldID);

    const inDb = await q(Tables.CustomObjectDefinition)
      .where({ id: CustomObjectDefinitionConstants.FirstID })
      .first();

    expect(inDb.display_field_id).toBe(CustomFieldDefinitionConstants.TitleFieldID);
  });

  test('keeps displayFieldId unchanged when displayFieldName does not match any field', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_CUSTOM_OBJECT_DEFINITION_MUTATION,
        variables: {
          id: CustomObjectDefinitionConstants.FirstID,
          input: {
            displayFieldName: 'NonExistent'
          }
        }
      });

    const {
      updateCustomObjectDefinition: { customObjectDefinition, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(customObjectDefinition.displayFieldId).toBeNull();
  });

  test('returns KEY_ALREADY_EXISTS error when updating to duplicate key', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_CUSTOM_OBJECT_DEFINITION_MUTATION,
        variables: {
          id: CustomObjectDefinitionConstants.FirstID,
          input: {
            name: 'FAQ'
          }
        }
      });

    const {
      updateCustomObjectDefinition: { customObjectDefinition, apiErrors }
    } = res.body.data;
    const [error] = apiErrors;

    expect(error.code).toBe('KEY_ALREADY_EXISTS');
    expect(customObjectDefinition).toBeNull();
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: UPDATE_CUSTOM_OBJECT_DEFINITION_MUTATION,
        variables: {
          id: CustomObjectDefinitionConstants.FirstID,
          input: {
            name: 'No Auth Update'
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const UPDATE_CUSTOM_OBJECT_DEFINITION_MUTATION = /* GraphQL */ `
  mutation UpdateCustomObjectDefinition($id: ID!, $input: UpdateCustomObjectDefinitionInput!) {
    updateCustomObjectDefinition(id: $id, input: $input) {
      apiErrors {
        code
        message
      }
      customObjectDefinition {
        id
        createdAt
        updatedAt
        name
        key
        displayFieldId
      }
    }
  }
`;
