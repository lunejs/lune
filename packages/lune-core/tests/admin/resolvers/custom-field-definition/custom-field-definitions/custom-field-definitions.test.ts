import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomFieldDefinitionFixtures } from './fixtures/custom-field-definition.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('customFieldDefinitions - Query', () => {
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

  test('returns all custom field definitions', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOM_FIELD_DEFINITIONS_QUERY,
        variables: {}
      });

    const { customFieldDefinitions } = res.body.data;

    expect(customFieldDefinitions.items).toHaveLength(5);
    expect(customFieldDefinitions.count).toBe(5);
    expect(customFieldDefinitions.pageInfo.total).toBe(5);
  });

  test('returns limited number of custom field definitions', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOM_FIELD_DEFINITIONS_QUERY,
        variables: {
          input: {
            take: 2
          }
        }
      });

    const { customFieldDefinitions } = res.body.data;

    expect(customFieldDefinitions.items).toHaveLength(2);
    expect(customFieldDefinitions.count).toBe(2);
    expect(customFieldDefinitions.pageInfo.total).toBe(5);
  });

  test('returns custom field definitions with offset', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOM_FIELD_DEFINITIONS_QUERY,
        variables: {
          input: {
            skip: 2
          }
        }
      });

    const { customFieldDefinitions } = res.body.data;

    expect(customFieldDefinitions.items).toHaveLength(3);
    expect(customFieldDefinitions.count).toBe(3);
    expect(customFieldDefinitions.pageInfo.total).toBe(5);
  });

  test('returns custom field definitions with pagination applied', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOM_FIELD_DEFINITIONS_QUERY,
        variables: {
          input: {
            take: 2,
            skip: 1
          }
        }
      });

    const { customFieldDefinitions } = res.body.data;

    expect(customFieldDefinitions.items).toHaveLength(2);
    expect(customFieldDefinitions.count).toBe(2);
    expect(customFieldDefinitions.pageInfo.total).toBe(5);
  });

  test('returns custom field definitions filtered by appliesToEntity', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOM_FIELD_DEFINITIONS_QUERY,
        variables: {
          input: {
            filters: {
              appliesToEntity: 'PRODUCT'
            }
          }
        }
      });

    const { customFieldDefinitions } = res.body.data;

    expect(customFieldDefinitions.items).toHaveLength(4);
    expect(customFieldDefinitions.items.every(item => item.appliesToEntity === 'PRODUCT')).toBe(
      true
    );
    expect(customFieldDefinitions.count).toBe(4);
    expect(customFieldDefinitions.pageInfo.total).toBe(4);
  });

  test('returns custom field definitions with filters and pagination combined', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOM_FIELD_DEFINITIONS_QUERY,
        variables: {
          input: {
            take: 2,
            filters: {
              appliesToEntity: 'PRODUCT'
            }
          }
        }
      });

    const { customFieldDefinitions } = res.body.data;

    expect(customFieldDefinitions.items).toHaveLength(2);
    expect(customFieldDefinitions.count).toBe(2);
    expect(customFieldDefinitions.pageInfo.total).toBe(4);
  });

  test('returns custom field definitions sorted by order', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_CUSTOM_FIELD_DEFINITIONS_QUERY,
        variables: {
          input: {
            filters: {
              appliesToEntity: 'PRODUCT'
            }
          }
        }
      });

    const { customFieldDefinitions } = res.body.data;
    const orders = customFieldDefinitions.items.map(item => item.order);

    expect(orders).toEqual([0, 1, 2, 3]);
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app).post('/admin-api').send({
      query: GET_CUSTOM_FIELD_DEFINITIONS_QUERY,
      variables: {}
    });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const GET_CUSTOM_FIELD_DEFINITIONS_QUERY = /* GraphQL */ `
  query CustomFieldDefinitions($input: CustomFieldDefinitionListInput) {
    customFieldDefinitions(input: $input) {
      items {
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
      count
      pageInfo {
        total
      }
    }
  }
`;
