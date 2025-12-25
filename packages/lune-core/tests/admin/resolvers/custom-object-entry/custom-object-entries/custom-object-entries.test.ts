import request from 'supertest';

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
import {
  CustomObjectEntryConstants,
  CustomObjectEntryFixtures
} from './fixtures/custom-object-entry.fixtures';
import { CustomObjectEntryValueFixtures } from './fixtures/custom-object-entry-value.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('customObjectEntries - Query', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new CustomObjectDefinitionFixtures(),
      new CustomFieldDefinitionFixtures(),
      new CustomObjectEntryFixtures(),
      new CustomObjectEntryValueFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('returns all entries for a definition', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CUSTOM_OBJECT_ENTRIES_QUERY,
        variables: {
          definitionId: CustomObjectDefinitionConstants.ID,
          input: {}
        }
      });

    expect(res.body.errors).toBeUndefined();
    expect(res.body.data.customObjectEntries.count).toBe(3);
    expect(res.body.data.customObjectEntries.pageInfo.total).toBe(3);
    expect(res.body.data.customObjectEntries.items).toHaveLength(3);
  });

  test('returns entries with values', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CUSTOM_OBJECT_ENTRIES_QUERY,
        variables: {
          definitionId: CustomObjectDefinitionConstants.ID,
          input: {}
        }
      });

    expect(res.body.errors).toBeUndefined();

    const entry1 = res.body.data.customObjectEntries.items.find(
      (e: { id: string }) => e.id === CustomObjectEntryConstants.Entry1ID
    );
    expect(entry1.values).toHaveLength(1);
    expect(entry1.values[0].field.id).toBe(CustomFieldDefinitionConstants.TitleFieldID);
  });

  test('supports pagination with take', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CUSTOM_OBJECT_ENTRIES_QUERY,
        variables: {
          definitionId: CustomObjectDefinitionConstants.ID,
          input: { take: 2 }
        }
      });

    expect(res.body.errors).toBeUndefined();
    expect(res.body.data.customObjectEntries.count).toBe(2);
    expect(res.body.data.customObjectEntries.pageInfo.total).toBe(3);
    expect(res.body.data.customObjectEntries.items).toHaveLength(2);
  });

  test('supports pagination with skip', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CUSTOM_OBJECT_ENTRIES_QUERY,
        variables: {
          definitionId: CustomObjectDefinitionConstants.ID,
          input: { skip: 2 }
        }
      });

    expect(res.body.errors).toBeUndefined();
    expect(res.body.data.customObjectEntries.count).toBe(1);
    expect(res.body.data.customObjectEntries.pageInfo.total).toBe(3);
    expect(res.body.data.customObjectEntries.items).toHaveLength(1);
  });

  test('supports pagination with skip and take', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CUSTOM_OBJECT_ENTRIES_QUERY,
        variables: {
          definitionId: CustomObjectDefinitionConstants.ID,
          input: { skip: 1, take: 1 }
        }
      });

    expect(res.body.errors).toBeUndefined();
    expect(res.body.data.customObjectEntries.count).toBe(1);
    expect(res.body.data.customObjectEntries.pageInfo.total).toBe(3);
    expect(res.body.data.customObjectEntries.items).toHaveLength(1);
  });

  test('returns empty list for non-existent definition', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CUSTOM_OBJECT_ENTRIES_QUERY,
        variables: {
          definitionId: TestUtils.generateUUID(),
          input: {}
        }
      });

    expect(res.body.errors).toBeUndefined();
    expect(res.body.data.customObjectEntries.count).toBe(0);
    expect(res.body.data.customObjectEntries.pageInfo.total).toBe(0);
    expect(res.body.data.customObjectEntries.items).toHaveLength(0);
  });

  test('returns UNAUTHORIZED error when no token is provided', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CUSTOM_OBJECT_ENTRIES_QUERY,
        variables: {
          definitionId: CustomObjectDefinitionConstants.ID,
          input: {}
        }
      });

    expect(res.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const CUSTOM_OBJECT_ENTRIES_QUERY = /* GraphQL */ `
  query CustomObjectEntries($definitionId: ID!, $input: ListInput!) {
    customObjectEntries(definitionId: $definitionId, input: $input) {
      count
      pageInfo {
        total
      }
      items {
        id
        createdAt
        updatedAt
        slug
        values {
          id
          value
          field {
            id
            key
          }
        }
      }
    }
  }
`;
