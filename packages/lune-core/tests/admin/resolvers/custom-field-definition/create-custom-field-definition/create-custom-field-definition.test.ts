import request from 'supertest';

import { Tables } from '@/persistence/tables';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomFieldDefinitionFixtures } from './fixtures/custom-field-definition.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('createCustomFieldDefinition - Mutation', () => {
  const testHelper = new TestUtils();
  const q = testHelper.getQueryBuilder();

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

  test('creates a basic single line text custom field', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_CUSTOM_FIELD_DEFINITION_MUTATION,
        variables: {
          input: {
            name: 'Short Description',
            isList: false,
            appliesToEntity: 'PRODUCT',
            type: 'SINGLE_LINE_TEXT',
            order: 0
          }
        }
      });

    const {
      createCustomFieldDefinition: { customFieldDefinition, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(customFieldDefinition).toMatchObject({
      name: 'Short Description',
      key: 'short_description',
      isList: false,
      appliesToEntity: 'PRODUCT',
      type: 'SINGLE_LINE_TEXT',
      metadata: null,
      order: 0
    });

    const inDb = await q(Tables.CustomFieldDefinition)
      .where({ id: customFieldDefinition.id })
      .first();

    expect(inDb.type).toBe('single_line_text');
    expect(inDb.applies_to_entity).toBe('product');
    expect(inDb.order).toBe(0);
  });

  test('creates a reference custom field with metadata', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_CUSTOM_FIELD_DEFINITION_MUTATION,
        variables: {
          input: {
            name: 'Related Products',
            isList: true,
            appliesToEntity: 'PRODUCT',
            type: 'PRODUCT_REFERENCE',
            metadata: { targetEntity: 'product' },
            order: 1
          }
        }
      });

    const {
      createCustomFieldDefinition: { customFieldDefinition, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(customFieldDefinition).toMatchObject({
      name: 'Related Products',
      key: 'related_products',
      isList: true,
      appliesToEntity: 'PRODUCT',
      type: 'PRODUCT_REFERENCE',
      order: 1
    });
  });

  test('creates a list custom field', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_CUSTOM_FIELD_DEFINITION_MUTATION,
        variables: {
          input: {
            name: 'Tags List',
            isList: true,
            appliesToEntity: 'PRODUCT',
            type: 'SINGLE_LINE_TEXT',
            order: 2
          }
        }
      });

    const {
      createCustomFieldDefinition: { customFieldDefinition, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(customFieldDefinition).toMatchObject({
      name: 'Tags List',
      key: 'tags_list',
      isList: true,
      appliesToEntity: 'PRODUCT',
      type: 'SINGLE_LINE_TEXT',
      order: 2
    });
  });

  test('returns KEY_ALREADY_EXISTS error when creating with duplicate key', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_CUSTOM_FIELD_DEFINITION_MUTATION,
        variables: {
          input: {
            name: 'Existing Field',
            isList: false,
            appliesToEntity: 'PRODUCT',
            type: 'SINGLE_LINE_TEXT',
            order: 0
          }
        }
      });

    const {
      createCustomFieldDefinition: { customFieldDefinition, apiErrors }
    } = res.body.data;
    const [error] = apiErrors;

    expect(error.code).toBe('KEY_ALREADY_EXISTS');
    expect(customFieldDefinition).toBeNull();
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: CREATE_CUSTOM_FIELD_DEFINITION_MUTATION,
        variables: {
          input: {
            name: 'No Auth Field',
            isList: false,
            appliesToEntity: 'PRODUCT',
            type: 'SINGLE_LINE_TEXT',
            order: 0
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const CREATE_CUSTOM_FIELD_DEFINITION_MUTATION = /* GraphQL */ `
  mutation CreateCustomFieldDefinition($input: CreateCustomFieldInput!) {
    createCustomFieldDefinition(input: $input) {
      apiErrors {
        code
        message
      }
      customFieldDefinition {
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
  }
`;
