import request from 'supertest';

import type { CustomObjectEntryValueTranslationTable } from '@/persistence/entities/custom-object-entry-value-translation';
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
import {
  CustomObjectEntryValueTranslationConstants,
  CustomObjectEntryValueTranslationFixtures
} from './fixtures/custom-object-entry-value-translation.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('addCustomObjectEntryTranslation - Mutation', () => {
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
      new CustomObjectEntryValueFixtures(),
      new CustomObjectEntryValueTranslationFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('adds new translation to entry values', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ADD_CUSTOM_OBJECT_ENTRY_TRANSLATION_MUTATION,
        variables: {
          id: CustomObjectEntryConstants.ID,
          input: {
            locale: 'en',
            values: [
              {
                id: CustomObjectEntryValueConstants.TitleValueID,
                value: 'My Blog Post'
              },
              {
                id: CustomObjectEntryValueConstants.ContentValueID,
                value: 'This is my blog post content'
              }
            ]
          }
        }
      });

    const { addCustomObjectEntryTranslation } = res.body.data;

    expect(addCustomObjectEntryTranslation.id).toBe(CustomObjectEntryConstants.ID);

    const titleValue = addCustomObjectEntryTranslation.values.find(
      (v: { id: string }) => v.id === CustomObjectEntryValueConstants.TitleValueID
    );
    const contentValue = addCustomObjectEntryTranslation.values.find(
      (v: { id: string }) => v.id === CustomObjectEntryValueConstants.ContentValueID
    );

    expect(titleValue.translations).toHaveLength(1);
    expect(titleValue.translations[0].value).toBe('My Blog Post');
    expect(titleValue.translations[0].locale).toBe('en');

    expect(contentValue.translations).toHaveLength(1);
    expect(contentValue.translations[0].value).toBe('This is my blog post content');
    expect(contentValue.translations[0].locale).toBe('en');
  });

  test('updates existing translation', async () => {
    const initialTranslation = await q<CustomObjectEntryValueTranslationTable>(
      Tables.CustomObjectEntryValueTranslation
    )
      .where({ entry_value_id: CustomObjectEntryValueConstants.AlreadyTranslatedTitleValueID })
      .first();

    expect(initialTranslation?.value as string).toBe(
      CustomObjectEntryValueTranslationConstants.AlreadyTranslatedTitleValue
    );

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ADD_CUSTOM_OBJECT_ENTRY_TRANSLATION_MUTATION,
        variables: {
          id: CustomObjectEntryConstants.AlreadyTranslatedID,
          input: {
            locale: 'en',
            values: [
              {
                id: CustomObjectEntryValueConstants.AlreadyTranslatedTitleValueID,
                value: 'Updated Title Translation'
              }
            ]
          }
        }
      });

    const { addCustomObjectEntryTranslation } = res.body.data;

    expect(addCustomObjectEntryTranslation.id).toBe(CustomObjectEntryConstants.AlreadyTranslatedID);

    const titleValue = addCustomObjectEntryTranslation.values.find(
      (v: { id: string }) => v.id === CustomObjectEntryValueConstants.AlreadyTranslatedTitleValueID
    );

    expect(titleValue.translations).toHaveLength(1);
    expect(titleValue.translations[0].value).toBe('Updated Title Translation');
  });

  test('adds translation with empty values array does nothing', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ADD_CUSTOM_OBJECT_ENTRY_TRANSLATION_MUTATION,
        variables: {
          id: CustomObjectEntryConstants.ID,
          input: {
            locale: 'en',
            values: []
          }
        }
      });

    const { addCustomObjectEntryTranslation } = res.body.data;

    expect(addCustomObjectEntryTranslation.id).toBe(CustomObjectEntryConstants.ID);
  });

  test('returns UNAUTHORIZED error when no token is provided', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ADD_CUSTOM_OBJECT_ENTRY_TRANSLATION_MUTATION,
        variables: {
          id: CustomObjectEntryConstants.ID,
          input: {
            locale: 'en',
            values: []
          }
        }
      });

    expect(res.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const ADD_CUSTOM_OBJECT_ENTRY_TRANSLATION_MUTATION = /* GraphQL */ `
  mutation AddCustomObjectEntryTranslation(
    $id: ID!
    $input: addCustomObjectEntryTranslationInput!
  ) {
    addCustomObjectEntryTranslation(id: $id, input: $input) {
      id
      slug
      values {
        id
        value
        translations {
          id
          value
          locale
        }
      }
    }
  }
`;
