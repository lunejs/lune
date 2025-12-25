import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import {
  CustomFieldDefinitionConstants,
  CustomFieldDefinitionFixtures
} from './fixtures/custom-field-definition.fixtures';
import { CustomObjectDefinitionFixtures } from './fixtures/custom-object-definition.fixtures';
import {
  CustomObjectEntryConstants,
  CustomObjectEntryFixtures
} from './fixtures/custom-object-entry.fixtures';
import { CustomObjectEntryValueFixtures } from './fixtures/custom-object-entry-value.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('updateCustomObjectEntry - Mutation', () => {
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

  test('updates existing value', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_CUSTOM_OBJECT_ENTRY_MUTATION,
        variables: {
          id: CustomObjectEntryConstants.ID,
          input: {
            values: [
              {
                id: CustomFieldDefinitionConstants.TitleFieldID,
                value: 'Updated Title'
              }
            ]
          }
        }
      });

    const { updateCustomObjectEntry } = res.body.data;

    expect(updateCustomObjectEntry.id).toBe(CustomObjectEntryConstants.ID);

    const titleValue = updateCustomObjectEntry.values.find(
      v => v.field.id === CustomFieldDefinitionConstants.TitleFieldID
    );
    expect(titleValue.value).toBe('Updated Title');
  });

  test('removes value when null is passed', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_CUSTOM_OBJECT_ENTRY_MUTATION,
        variables: {
          id: CustomObjectEntryConstants.ID,
          input: {
            values: [
              {
                id: CustomFieldDefinitionConstants.TitleFieldID,
                value: null
              }
            ]
          }
        }
      });

    const { updateCustomObjectEntry } = res.body.data;

    expect(updateCustomObjectEntry.id).toBe(CustomObjectEntryConstants.ID);

    // Only content should remain, title was removed
    expect(updateCustomObjectEntry.values).toHaveLength(1);
    expect(updateCustomObjectEntry.values[0].field.id).toBe(
      CustomFieldDefinitionConstants.ContentFieldID
    );
  });

  test('adds new value', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_CUSTOM_OBJECT_ENTRY_MUTATION,
        variables: {
          id: CustomObjectEntryConstants.ID,
          input: {
            values: [
              {
                id: CustomFieldDefinitionConstants.AuthorFieldID,
                value: 'John Doe'
              }
            ]
          }
        }
      });

    const { updateCustomObjectEntry } = res.body.data;

    expect(updateCustomObjectEntry.id).toBe(CustomObjectEntryConstants.ID);

    // Original 2 values + new author value
    expect(updateCustomObjectEntry.values).toHaveLength(3);

    const authorValue = updateCustomObjectEntry.values.find(
      v => v.field.id === CustomFieldDefinitionConstants.AuthorFieldID
    );
    expect(authorValue.value).toBe('John Doe');
  });

  test('handles mixed operations: update, add, and remove', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_CUSTOM_OBJECT_ENTRY_MUTATION,
        variables: {
          id: CustomObjectEntryConstants.ID,
          input: {
            values: [
              {
                id: CustomFieldDefinitionConstants.TitleFieldID,
                value: 'New Title' // update
              },
              {
                id: CustomFieldDefinitionConstants.ContentFieldID,
                value: null // remove
              },
              {
                id: CustomFieldDefinitionConstants.AuthorFieldID,
                value: 'Jane Doe' // add
              }
            ]
          }
        }
      });

    const { updateCustomObjectEntry } = res.body.data;

    expect(updateCustomObjectEntry.id).toBe(CustomObjectEntryConstants.ID);

    // Title (updated) + Author (new) = 2, Content was removed
    expect(updateCustomObjectEntry.values).toHaveLength(2);

    const titleValue = updateCustomObjectEntry.values.find(
      v => v.field.id === CustomFieldDefinitionConstants.TitleFieldID
    );
    const authorValue = updateCustomObjectEntry.values.find(
      v => v.field.id === CustomFieldDefinitionConstants.AuthorFieldID
    );
    const contentValue = updateCustomObjectEntry.values.find(
      v => v.field.id === CustomFieldDefinitionConstants.ContentFieldID
    );

    expect(titleValue.value).toBe('New Title');
    expect(authorValue.value).toBe('Jane Doe');
    expect(contentValue).toBeUndefined();
  });

  test('returns entry unchanged when no values provided', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_CUSTOM_OBJECT_ENTRY_MUTATION,
        variables: {
          id: CustomObjectEntryConstants.ID,
          input: {
            values: []
          }
        }
      });

    const { updateCustomObjectEntry } = res.body.data;

    expect(updateCustomObjectEntry.id).toBe(CustomObjectEntryConstants.ID);

    // Original values should remain
    expect(updateCustomObjectEntry.values).toHaveLength(2);
  });

  test('returns UNAUTHORIZED error when no token is provided', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_CUSTOM_OBJECT_ENTRY_MUTATION,
        variables: {
          id: CustomObjectEntryConstants.ID,
          input: {
            values: []
          }
        }
      });

    expect(res.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const UPDATE_CUSTOM_OBJECT_ENTRY_MUTATION = /* GraphQL */ `
  mutation UpdateCustomObjectEntry($id: ID!, $input: UpdateCustomObjectEntryInput!) {
    updateCustomObjectEntry(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      slug
      values {
        id
        value
        field {
          id
        }
      }
    }
  }
`;
