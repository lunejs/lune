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
import {
  CustomObjectEntryConstants,
  CustomObjectEntryFixtures
} from './fixtures/custom-object-entry.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('createCustomObjectEntry - Mutation', () => {
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
      new CustomObjectEntryFixtures()
    ]);

    // Update display_field_id after both tables are populated (circular reference)
    await q(Tables.CustomObjectDefinition)
      .where({ id: CustomObjectDefinitionConstants.WithDisplayFieldID })
      .update({ display_field_id: CustomFieldDefinitionConstants.TitleFieldID });
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('creates entry with slug from displayField value', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_CUSTOM_OBJECT_ENTRY_MUTATION,
        variables: {
          definitionId: CustomObjectDefinitionConstants.WithDisplayFieldID,
          input: {
            values: [
              {
                id: CustomFieldDefinitionConstants.TitleFieldID,
                value: 'My First Blog Post'
              },
              {
                id: CustomFieldDefinitionConstants.ContentFieldID,
                value: 'This is the content of my blog post'
              }
            ]
          }
        }
      });

    const { createCustomObjectEntry } = res.body.data;

    expect(createCustomObjectEntry).toMatchObject({
      slug: 'my-first-blog-post'
    });
    expect(createCustomObjectEntry.definition.id).toBe(
      CustomObjectDefinitionConstants.WithDisplayFieldID
    );
    expect(createCustomObjectEntry.values).toHaveLength(2);

    const titleValue = createCustomObjectEntry.values.find(
      (v: { field: { id: string } }) => v.field.id === CustomFieldDefinitionConstants.TitleFieldID
    );
    const contentValue = createCustomObjectEntry.values.find(
      (v: { field: { id: string } }) => v.field.id === CustomFieldDefinitionConstants.ContentFieldID
    );

    expect(titleValue.value).toBe('My First Blog Post');
    expect(contentValue.value).toBe('This is the content of my blog post');
  });

  test('creates entry with random suffix when displayField value is not provided', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_CUSTOM_OBJECT_ENTRY_MUTATION,
        variables: {
          definitionId: CustomObjectDefinitionConstants.WithDisplayFieldID,
          input: {
            values: [
              {
                id: CustomFieldDefinitionConstants.ContentFieldID,
                value: 'Content without title'
              }
            ]
          }
        }
      });

    const { createCustomObjectEntry } = res.body.data;

    expect(createCustomObjectEntry.slug).toMatch(
      new RegExp(`^${CustomObjectDefinitionConstants.WithDisplayFieldKey}-[a-z]{8}$`)
    );
  });

  test('creates entry with random suffix slug when definition has no displayField', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_CUSTOM_OBJECT_ENTRY_MUTATION,
        variables: {
          definitionId: CustomObjectDefinitionConstants.WithoutDisplayFieldID,
          input: {
            values: [
              {
                id: CustomFieldDefinitionConstants.QuestionFieldID,
                value: 'What is Lune?'
              }
            ]
          }
        }
      });

    const { createCustomObjectEntry } = res.body.data;

    expect(createCustomObjectEntry.slug).toMatch(
      new RegExp(`^${CustomObjectDefinitionConstants.WithoutDisplayFieldKey}-[a-z]{8}$`)
    );
    expect(createCustomObjectEntry.values).toHaveLength(1);
  });

  test('adds numeric suffix to slug when duplicate exists', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_CUSTOM_OBJECT_ENTRY_MUTATION,
        variables: {
          definitionId: CustomObjectDefinitionConstants.WithDisplayFieldID,
          input: {
            values: [
              {
                id: CustomFieldDefinitionConstants.TitleFieldID,
                value: CustomObjectEntryConstants.ExistingTitle
              }
            ]
          }
        }
      });

    const { createCustomObjectEntry } = res.body.data;

    expect(createCustomObjectEntry.slug).toBe(`${CustomObjectEntryConstants.ExistingSlug}-1`);
  });

  test('creates entry with no values', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_CUSTOM_OBJECT_ENTRY_MUTATION,
        variables: {
          definitionId: CustomObjectDefinitionConstants.WithDisplayFieldID,
          input: {
            values: []
          }
        }
      });

    const { createCustomObjectEntry } = res.body.data;

    expect(createCustomObjectEntry.slug).toMatch(
      new RegExp(`^${CustomObjectDefinitionConstants.WithDisplayFieldKey}-[a-z]{8}$`)
    );
    expect(createCustomObjectEntry.values).toHaveLength(0);
  });

  test('filters out values with null value', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_CUSTOM_OBJECT_ENTRY_MUTATION,
        variables: {
          definitionId: CustomObjectDefinitionConstants.WithDisplayFieldID,
          input: {
            values: [
              {
                id: CustomFieldDefinitionConstants.TitleFieldID,
                value: 'Valid Title'
              },
              {
                id: CustomFieldDefinitionConstants.ContentFieldID,
                value: null
              }
            ]
          }
        }
      });

    const { createCustomObjectEntry } = res.body.data;

    expect(createCustomObjectEntry.values).toHaveLength(1);

    const valuesInDb = await q(Tables.CustomObjectEntryValue).where({
      entry_id: createCustomObjectEntry.id
    });

    expect(valuesInDb).toHaveLength(1);
    expect(valuesInDb[0].field_id).toBe(CustomFieldDefinitionConstants.TitleFieldID);
  });

  test('returns UNAUTHORIZED error when no token is provided', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_CUSTOM_OBJECT_ENTRY_MUTATION,
        variables: {
          definitionId: CustomObjectDefinitionConstants.WithDisplayFieldID,
          input: {
            values: []
          }
        }
      });

    expect(res.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const CREATE_CUSTOM_OBJECT_ENTRY_MUTATION = /* GraphQL */ `
  mutation CreateCustomObjectEntry($definitionId: ID!, $input: CreateCustomObjectEntryInput!) {
    createCustomObjectEntry(definitionId: $definitionId, input: $input) {
      id
      createdAt
      updatedAt
      slug
      definition {
        id
        name
        key
      }
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
