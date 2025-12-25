import request from 'supertest';

import { Tables } from '@/persistence/tables';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomFieldDefinitionFixtures } from './fixtures/custom-field-definition.fixtures';
import { CustomObjectDefinitionFixtures } from './fixtures/custom-object-definition.fixtures';
import {
  CustomObjectEntryConstants,
  CustomObjectEntryFixtures
} from './fixtures/custom-object-entry.fixtures';
import {
  CustomObjectEntryValueConstants,
  CustomObjectEntryValueFixtures
} from './fixtures/custom-object-entry-value.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('removeCustomObjectEntry - Mutation', () => {
  const testHelper = new TestUtils();
  const q = testHelper.getQueryBuilder();

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

  test('removes a single entry', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: REMOVE_CUSTOM_OBJECT_ENTRY_MUTATION,
        variables: {
          ids: [CustomObjectEntryConstants.Entry1ID]
        }
      });

    expect(res.body.data.removeCustomObjectEntry).toBe(true);

    const entriesInDb = await q(Tables.CustomObjectEntry).select('id');
    expect(entriesInDb).toHaveLength(2);
    expect(entriesInDb.map(e => e.id)).not.toContain(CustomObjectEntryConstants.Entry1ID);
  });

  test('removes multiple entries', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: REMOVE_CUSTOM_OBJECT_ENTRY_MUTATION,
        variables: {
          ids: [CustomObjectEntryConstants.Entry1ID, CustomObjectEntryConstants.Entry2ID]
        }
      });

    expect(res.body.data.removeCustomObjectEntry).toBe(true);

    const entriesInDb = await q(Tables.CustomObjectEntry).select('id');
    expect(entriesInDb).toHaveLength(1);
    expect(entriesInDb[0].id).toBe(CustomObjectEntryConstants.Entry3ID);
  });

  test('cascades delete to entry values', async () => {
    // Verify values exist before delete
    const valuesBefore = await q(Tables.CustomObjectEntryValue)
      .where({ entry_id: CustomObjectEntryConstants.Entry1ID })
      .select('id');
    expect(valuesBefore).toHaveLength(1);

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: REMOVE_CUSTOM_OBJECT_ENTRY_MUTATION,
        variables: {
          ids: [CustomObjectEntryConstants.Entry1ID]
        }
      });

    expect(res.body.data.removeCustomObjectEntry).toBe(true);

    // Verify values were cascade deleted
    const valuesAfter = await q(Tables.CustomObjectEntryValue)
      .where({ entry_id: CustomObjectEntryConstants.Entry1ID })
      .select('id');
    expect(valuesAfter).toHaveLength(0);

    // Other entries' values should remain
    const otherValues = await q(Tables.CustomObjectEntryValue).select('id');
    expect(otherValues).toHaveLength(2);
  });

  test('cascades delete to multiple entries values', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: REMOVE_CUSTOM_OBJECT_ENTRY_MUTATION,
        variables: {
          ids: [CustomObjectEntryConstants.Entry1ID, CustomObjectEntryConstants.Entry2ID]
        }
      });

    expect(res.body.data.removeCustomObjectEntry).toBe(true);

    // Only Entry3's value should remain
    const valuesInDb = await q(Tables.CustomObjectEntryValue).select('id');
    expect(valuesInDb).toHaveLength(1);
    expect(valuesInDb[0].id).toBe(CustomObjectEntryValueConstants.Value3ID);
  });

  test('returns true when removing non-existent entry', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: REMOVE_CUSTOM_OBJECT_ENTRY_MUTATION,
        variables: {
          ids: [TestUtils.generateUUID()]
        }
      });

    expect(res.body.data.removeCustomObjectEntry).toBe(true);

    // All entries should still exist
    const entriesInDb = await q(Tables.CustomObjectEntry).select('id');
    expect(entriesInDb).toHaveLength(3);
  });

  test('returns UNAUTHORIZED error when no token is provided', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: REMOVE_CUSTOM_OBJECT_ENTRY_MUTATION,
        variables: {
          ids: [CustomObjectEntryConstants.Entry1ID]
        }
      });

    expect(res.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const REMOVE_CUSTOM_OBJECT_ENTRY_MUTATION = /* GraphQL */ `
  mutation RemoveCustomObjectEntry($ids: [ID!]!) {
    removeCustomObjectEntry(ids: $ids)
  }
`;
