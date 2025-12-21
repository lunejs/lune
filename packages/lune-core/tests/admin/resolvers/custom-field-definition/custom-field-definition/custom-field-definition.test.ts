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

describe('customFieldDefinition - Query', () => {
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

  test('returns custom field definition by id', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOM_FIELD_DEFINITION_QUERY,
        variables: {
          id: CustomFieldDefinitionConstants.TextFieldID
        }
      });

    const { customFieldDefinition } = res.body.data;

    expect(customFieldDefinition.id).toBe(CustomFieldDefinitionConstants.TextFieldID);
    expect(customFieldDefinition.name).toBe('Short Description');
    expect(customFieldDefinition.key).toBe('short_description');
    expect(customFieldDefinition.isList).toBe(false);
  });

  test('returns null when custom field definition does not exist', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOM_FIELD_DEFINITION_QUERY,
        variables: {
          id: TestUtils.generateUUID()
        }
      });

    expect(res.body.data.customFieldDefinition).toBeNull();
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: GET_CUSTOM_FIELD_DEFINITION_QUERY,
        variables: {
          id: CustomFieldDefinitionConstants.TextFieldID
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const GET_CUSTOM_FIELD_DEFINITION_QUERY = /* GraphQL */ `
  query CustomFieldDefinition($id: ID!) {
    customFieldDefinition(id: $id) {
      id
      createdAt
      updatedAt
      name
      key
      isList
      appliesToEntity
      type
      metadata
    }
  }
`;
