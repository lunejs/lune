import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import {
  CustomObjectDefinitionConstants,
  CustomObjectDefinitionFixtures
} from './fixtures/custom-object-definition.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('customObjectDefinition - Query', () => {
  const testHelper = new TestUtils();

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

  test('returns custom object definition by id', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOM_OBJECT_DEFINITION_QUERY,
        variables: {
          id: CustomObjectDefinitionConstants.FirstID
        }
      });

    const { customObjectDefinition } = res.body.data;

    expect(customObjectDefinition.id).toBe(CustomObjectDefinitionConstants.FirstID);
    expect(customObjectDefinition.name).toBe('Blog Post');
    expect(customObjectDefinition.key).toBe('blog_post');
  });

  test('returns null when custom object definition does not exist', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOM_OBJECT_DEFINITION_QUERY,
        variables: {
          id: TestUtils.generateUUID()
        }
      });

    expect(res.body.data.customObjectDefinition).toBeNull();
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: GET_CUSTOM_OBJECT_DEFINITION_QUERY,
        variables: {
          id: CustomObjectDefinitionConstants.FirstID
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const GET_CUSTOM_OBJECT_DEFINITION_QUERY = /* GraphQL */ `
  query CustomObjectDefinition($id: ID!) {
    customObjectDefinition(id: $id) {
      id
      createdAt
      updatedAt
      name
      key
    }
  }
`;
