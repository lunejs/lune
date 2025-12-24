import request from 'supertest';

import { Tables } from '@/persistence/tables';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomObjectDefinitionFixtures } from './fixtures/custom-object-definition.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('createCustomObjectDefinition - Mutation', () => {
  const testHelper = new TestUtils();
  const q = testHelper.getQueryBuilder();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new CustomObjectDefinitionFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('creates a custom object definition with display field', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_CUSTOM_OBJECT_DEFINITION_MUTATION,
        variables: {
          input: {
            name: 'Blog Post',
            displayFieldName: 'Title',
            fields: [
              {
                name: 'Title',
                isList: false,
                appliesToEntity: 'PRODUCT',
                type: 'SINGLE_LINE_TEXT',
                order: 0
              }
            ]
          }
        }
      });

    const {
      createCustomObjectDefinition: { customObjectDefinition, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(customObjectDefinition).toMatchObject({
      name: 'Blog Post',
      key: 'blog_post'
    });
    expect(customObjectDefinition.displayFieldId).not.toBeNull();

    const inDb = await q(Tables.CustomObjectDefinition)
      .where({ id: customObjectDefinition.id })
      .first();

    expect(inDb.name).toBe('Blog Post');
    expect(inDb.key).toBe('blog_post');
    expect(inDb.display_field_id).not.toBeNull();
  });

  test('creates a custom object definition with multiple fields', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_CUSTOM_OBJECT_DEFINITION_MUTATION,
        variables: {
          input: {
            name: 'FAQ',
            displayFieldName: 'Question',
            fields: [
              {
                name: 'Question',
                isList: false,
                appliesToEntity: 'PRODUCT',
                type: 'SINGLE_LINE_TEXT',
                order: 0
              },
              {
                name: 'Answer',
                isList: false,
                appliesToEntity: 'PRODUCT',
                type: 'MULTI_LINE_TEXT',
                order: 1
              }
            ]
          }
        }
      });

    const {
      createCustomObjectDefinition: { customObjectDefinition, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(customObjectDefinition).toMatchObject({
      name: 'FAQ',
      key: 'faq'
    });

    expect(customObjectDefinition.fields).toHaveLength(2);
    expect(customObjectDefinition.fields.map(f => f.name)).toEqual(['Question', 'Answer']);

    const displayField = customObjectDefinition.fields.find(
      f => f.id === customObjectDefinition.displayFieldId
    );
    expect(displayField?.name).toBe('Question');
  });

  test('leaves displayFieldId null when displayFieldName does not match any field', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_CUSTOM_OBJECT_DEFINITION_MUTATION,
        variables: {
          input: {
            name: 'Test Object',
            displayFieldName: 'NonExistent',
            fields: [
              {
                name: 'Title',
                isList: false,
                appliesToEntity: 'PRODUCT',
                type: 'SINGLE_LINE_TEXT',
                order: 0
              }
            ]
          }
        }
      });

    const {
      createCustomObjectDefinition: { customObjectDefinition, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(customObjectDefinition.displayFieldId).toBeNull();
  });

  test('returns KEY_ALREADY_EXISTS error when creating with duplicate key', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_CUSTOM_OBJECT_DEFINITION_MUTATION,
        variables: {
          input: {
            name: 'Existing Object',
            displayFieldName: 'Title',
            fields: [
              {
                name: 'Title',
                isList: false,
                appliesToEntity: 'PRODUCT',
                type: 'SINGLE_LINE_TEXT',
                order: 0
              }
            ]
          }
        }
      });

    const {
      createCustomObjectDefinition: { customObjectDefinition, apiErrors }
    } = res.body.data;
    const [error] = apiErrors;

    expect(error.code).toBe('KEY_ALREADY_EXISTS');
    expect(customObjectDefinition).toBeNull();
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: CREATE_CUSTOM_OBJECT_DEFINITION_MUTATION,
        variables: {
          input: {
            name: 'No Auth Object',
            displayFieldName: 'Title',
            fields: [
              {
                name: 'Title',
                isList: false,
                appliesToEntity: 'PRODUCT',
                type: 'SINGLE_LINE_TEXT',
                order: 0
              }
            ]
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const CREATE_CUSTOM_OBJECT_DEFINITION_MUTATION = /* GraphQL */ `
  mutation CreateCustomObjectDefinition($input: CreateCustomObjectDefinitionInput!) {
    createCustomObjectDefinition(input: $input) {
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
        fields {
          id
          name
          order
        }
      }
    }
  }
`;
