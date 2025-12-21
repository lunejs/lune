import request from 'supertest';

import type { CustomFieldDefinitionTable } from '@/persistence/entities/custom-field-definition';
import type { ID } from '@/persistence/entities/entity';
import { Tables } from '@/persistence/tables';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import {
  CustomFieldDefinitionConstants,
  CustomFieldDefinitionFixtures
} from './fixtures/custom-field-definition.fixtures';
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
