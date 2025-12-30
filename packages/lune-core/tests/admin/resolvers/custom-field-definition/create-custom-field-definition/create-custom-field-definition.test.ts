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

const CUSTOM_FIELD_TYPE_MAPPING: { apiType: string; dbType: string }[] = [
  { apiType: 'SINGLE_LINE_TEXT', dbType: 'single_line_text' },
  { apiType: 'MULTI_LINE_TEXT', dbType: 'multi_line_text' },
  { apiType: 'URL', dbType: 'url' },
  { apiType: 'COLOR', dbType: 'color' },
  { apiType: 'INTEGER', dbType: 'integer' },
  { apiType: 'DECIMAL', dbType: 'decimal' },
  { apiType: 'MONEY', dbType: 'money' },
  { apiType: 'DATE', dbType: 'date' },
  { apiType: 'BOOLEAN', dbType: 'boolean' },
  { apiType: 'IMAGE', dbType: 'image' },
  { apiType: 'PRODUCT_REFERENCE', dbType: 'product_reference' },
  { apiType: 'COLLECTION_REFERENCE', dbType: 'collection_reference' }
];

describe('createCustomFieldDefinition - Mutation', () => {
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

  test.each(CUSTOM_FIELD_TYPE_MAPPING)(
    'type $apiType should be stored as $dbType in database',
    async ({ apiType, dbType }) => {
      const fieldName = `Test ${apiType.toLowerCase().replace(/_/g, ' ')}`;

      const res = await request(app)
        .post('/admin-api')
        .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
        .set('x_lune_shop_id', ShopConstants.ID)
        .send({
          query: CREATE_CUSTOM_FIELD_DEFINITION_MUTATION,
          variables: {
            input: {
              name: fieldName,
              isList: false,
              appliesToEntity: 'PRODUCT',
              type: apiType,
              order: 0
            }
          }
        });

      const {
        createCustomFieldDefinition: { customFieldDefinition, apiErrors }
      } = res.body.data;

      expect(apiErrors).toHaveLength(0);
      expect(customFieldDefinition.type).toBe(apiType);

      const inDb = await q(Tables.CustomFieldDefinition)
        .where({ id: customFieldDefinition.id })
        .first();

      expect(inDb.type).toBe(dbType);
    }
  );

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

  test('creates a custom object reference field with referenceTarget and stores correct type in database', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_CUSTOM_FIELD_DEFINITION_MUTATION,
        variables: {
          input: {
            name: 'Related Post',
            isList: false,
            appliesToEntity: 'PRODUCT',
            type: 'CUSTOM_OBJECT_REFERENCE',
            order: 3,
            referenceTargetId: CustomObjectDefinitionConstants.ID
          }
        }
      });

    const {
      createCustomFieldDefinition: { customFieldDefinition, apiErrors }
    } = res.body.data;

    // Validate API response
    expect(apiErrors).toHaveLength(0);
    expect(customFieldDefinition).toMatchObject({
      name: 'Related Post',
      key: 'related_post',
      isList: false,
      appliesToEntity: 'PRODUCT',
      type: 'CUSTOM_OBJECT_REFERENCE',
      order: 3
    });
    expect(customFieldDefinition.referenceTarget.id).toBe(CustomObjectDefinitionConstants.ID);
    expect(customFieldDefinition.referenceTarget.name).toBe(CustomObjectDefinitionConstants.Name);

    // Validate database storage
    const inDb = await q(Tables.CustomFieldDefinition)
      .where({ id: customFieldDefinition.id })
      .first();

    expect(inDb.type).toBe('custom_object_reference');
    expect(inDb.reference_target_id).toBe(CustomObjectDefinitionConstants.ID);
  });

  test('returns KEY_ALREADY_EXISTS error when creating with duplicate key for same entity', async () => {
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

  test('allows same key for different appliesToEntity', async () => {
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
            appliesToEntity: 'COLLECTION',
            type: 'SINGLE_LINE_TEXT',
            order: 0
          }
        }
      });

    const {
      createCustomFieldDefinition: { customFieldDefinition, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(customFieldDefinition.key).toBe(CustomFieldDefinitionConstants.DuplicateKey);
    expect(customFieldDefinition.appliesToEntity).toBe('COLLECTION');
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
        referenceTarget {
          id
          name
        }
      }
    }
  }
`;
