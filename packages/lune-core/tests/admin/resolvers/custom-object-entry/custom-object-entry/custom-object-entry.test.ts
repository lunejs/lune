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

describe('customObjectEntry - Query', () => {
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

  test('returns entry by id', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CUSTOM_OBJECT_ENTRY_QUERY,
        variables: {
          id: CustomObjectEntryConstants.Entry1ID
        }
      });

    expect(res.body.errors).toBeUndefined();
    expect(res.body.data.customObjectEntry).not.toBeNull();
    expect(res.body.data.customObjectEntry.id).toBe(CustomObjectEntryConstants.Entry1ID);
    expect(res.body.data.customObjectEntry.slug).toBe('entry-1');
  });

  test('returns entry with definition', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CUSTOM_OBJECT_ENTRY_QUERY,
        variables: {
          id: CustomObjectEntryConstants.Entry1ID
        }
      });

    expect(res.body.errors).toBeUndefined();
    expect(res.body.data.customObjectEntry.definition).not.toBeNull();
    expect(res.body.data.customObjectEntry.definition.id).toBe(CustomObjectDefinitionConstants.ID);
    expect(res.body.data.customObjectEntry.definition.name).toBe('Blog Post');
  });

  test('returns entry with values', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CUSTOM_OBJECT_ENTRY_QUERY,
        variables: {
          id: CustomObjectEntryConstants.Entry1ID
        }
      });

    expect(res.body.errors).toBeUndefined();
    expect(res.body.data.customObjectEntry.values).toHaveLength(1);
    expect(res.body.data.customObjectEntry.values[0].field.id).toBe(
      CustomFieldDefinitionConstants.TitleFieldID
    );
  });

  test('returns null when entry does not exist', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CUSTOM_OBJECT_ENTRY_QUERY,
        variables: {
          id: TestUtils.generateUUID()
        }
      });

    expect(res.body.errors).toBeUndefined();
    expect(res.body.data.customObjectEntry).toBeNull();
  });

  test('returns UNAUTHORIZED error when no token is provided', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CUSTOM_OBJECT_ENTRY_QUERY,
        variables: {
          id: CustomObjectEntryConstants.Entry1ID
        }
      });

    expect(res.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const CUSTOM_OBJECT_ENTRY_QUERY = /* GraphQL */ `
  query CustomObjectEntry($id: ID!) {
    customObjectEntry(id: $id) {
      id
      createdAt
      updatedAt
      slug
      definition {
        id
        name
      }
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
`;
