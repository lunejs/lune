import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomObjectDefinitionFixtures } from './fixtures/custom-object-definition.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('customObjectDefinitions - Query', () => {
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

  test('returns all custom object definitions', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOM_OBJECT_DEFINITIONS_QUERY,
        variables: {}
      });

    const { customObjectDefinitions } = res.body.data;

    expect(customObjectDefinitions.items).toHaveLength(3);
    expect(customObjectDefinitions.count).toBe(3);
    expect(customObjectDefinitions.pageInfo.total).toBe(3);
  });

  test('returns limited number of custom object definitions', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOM_OBJECT_DEFINITIONS_QUERY,
        variables: {
          input: {
            take: 2
          }
        }
      });

    const { customObjectDefinitions } = res.body.data;

    expect(customObjectDefinitions.items).toHaveLength(2);
    expect(customObjectDefinitions.count).toBe(2);
    expect(customObjectDefinitions.pageInfo.total).toBe(3);
  });

  test('returns custom object definitions with offset', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOM_OBJECT_DEFINITIONS_QUERY,
        variables: {
          input: {
            skip: 1
          }
        }
      });

    const { customObjectDefinitions } = res.body.data;

    expect(customObjectDefinitions.items).toHaveLength(2);
    expect(customObjectDefinitions.count).toBe(2);
    expect(customObjectDefinitions.pageInfo.total).toBe(3);
  });

  test('returns custom object definitions with pagination applied', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOM_OBJECT_DEFINITIONS_QUERY,
        variables: {
          input: {
            take: 1,
            skip: 1
          }
        }
      });

    const { customObjectDefinitions } = res.body.data;

    expect(customObjectDefinitions.items).toHaveLength(1);
    expect(customObjectDefinitions.count).toBe(1);
    expect(customObjectDefinitions.pageInfo.total).toBe(3);
  });

  test('returns custom object definitions filtered by name contains', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOM_OBJECT_DEFINITIONS_QUERY,
        variables: {
          input: {
            filters: {
              name: { contains: 'Blog' }
            }
          }
        }
      });

    const { customObjectDefinitions } = res.body.data;

    expect(customObjectDefinitions.items).toHaveLength(1);
    expect(customObjectDefinitions.items[0].name).toBe('Blog Post');
    expect(customObjectDefinitions.count).toBe(1);
    expect(customObjectDefinitions.pageInfo.total).toBe(1);
  });

  test('returns custom object definitions filtered by name equals', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOM_OBJECT_DEFINITIONS_QUERY,
        variables: {
          input: {
            filters: {
              name: { equals: 'FAQ' }
            }
          }
        }
      });

    const { customObjectDefinitions } = res.body.data;

    expect(customObjectDefinitions.items).toHaveLength(1);
    expect(customObjectDefinitions.items[0].name).toBe('FAQ');
    expect(customObjectDefinitions.count).toBe(1);
    expect(customObjectDefinitions.pageInfo.total).toBe(1);
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app).post('/admin-api').send({
      query: GET_CUSTOM_OBJECT_DEFINITIONS_QUERY,
      variables: {}
    });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const GET_CUSTOM_OBJECT_DEFINITIONS_QUERY = /* GraphQL */ `
  query CustomObjectDefinitions($input: CustomObjectDefinitionListInput) {
    customObjectDefinitions(input: $input) {
      items {
        id
        createdAt
        updatedAt
        name
        key
      }
      count
      pageInfo {
        total
      }
    }
  }
`;
