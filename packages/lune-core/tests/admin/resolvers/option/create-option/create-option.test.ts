import request from 'supertest';

import type { OptionTable } from '@/persistence/entities/option';
import type { OptionValueTable } from '@/persistence/entities/option_value';
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
import { CustomObjectEntryValueFixtures } from './fixtures/custom-object-entry-value.fixtures';
import { OptionFixtures } from './fixtures/option.fixtures';
import { OptionValueFixtures } from './fixtures/option-value.fixtures';
import { ProductConstants, ProductFixtures } from './fixtures/product.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('createOption - Mutation', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new ProductFixtures(),
      new OptionFixtures(),
      new OptionValueFixtures(),
      new CustomObjectDefinitionFixtures(),
      new CustomFieldDefinitionFixtures(),
      new CustomObjectEntryFixtures(),
      new CustomObjectEntryValueFixtures()
    ]);

    // Update display_field_id after both tables are populated (circular reference)
    const q = testHelper.getQueryBuilder();
    await q(Tables.CustomObjectDefinition)
      .where({ id: CustomObjectDefinitionConstants.ColorDefinitionID })
      .update({ display_field_id: CustomFieldDefinitionConstants.ColorNameFieldID });
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('creates simple options', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_OPTION_MUTATION,
        variables: {
          productId: ProductConstants.ID,
          input: [
            {
              order: 0,
              name: 'New Option',
              values: []
            }
          ]
        }
      });

    const { createOption } = res.body.data;

    expect(createOption[0].name).toBe('New Option');
  });

  test('creates options with values', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_OPTION_MUTATION,
        variables: {
          productId: ProductConstants.WithNoOptions,
          input: [
            {
              order: 0,
              name: 'Size',
              values: [
                { order: 0, name: 'XS' },
                { order: 1, name: 'S' },
                { order: 2, name: 'M' }
              ]
            },
            {
              order: 1,
              name: 'Color',
              values: [
                { order: 0, name: 'Green' },
                { order: 1, name: 'Blue' },
                { order: 2, name: 'Red' }
              ]
            }
          ]
        }
      });

    const { createOption } = res.body.data;

    expect(createOption[0]).toMatchObject({
      name: 'Size',
      values: [{ name: 'XS' }, { name: 'S' }, { name: 'M' }]
    });

    expect(createOption[1]).toMatchObject({
      name: 'Color',
      values: [{ name: 'Green' }, { name: 'Blue' }, { name: 'Red' }]
    });

    const productOptions = await testHelper
      .getQueryBuilder()<OptionTable>(Tables.Option)
      .where({ product_id: ProductConstants.WithNoOptions });

    expect(productOptions).toHaveLength(2);
  });

  test('creates option with custom object entry values', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_OPTION_MUTATION,
        variables: {
          productId: ProductConstants.WithNoOptions,
          input: [
            {
              order: 0,
              name: 'Color',
              values: [
                { order: 0, customObjectEntryId: CustomObjectEntryConstants.RedEntryID },
                { order: 1, customObjectEntryId: CustomObjectEntryConstants.BlueEntryID }
              ]
            }
          ]
        }
      });

    const { createOption } = res.body.data;

    expect(createOption[0].name).toBe('Color');
    expect(createOption[0].values).toHaveLength(2);

    expect(createOption[0].values[0]).toMatchObject({
      customObjectEntry: {
        id: CustomObjectEntryConstants.RedEntryID,
        slug: 'red'
      }
    });

    expect(createOption[0].values[1]).toMatchObject({
      customObjectEntry: {
        id: CustomObjectEntryConstants.BlueEntryID,
        slug: 'blue'
      }
    });

    // Verify in database
    const optionValues = await testHelper
      .getQueryBuilder()<OptionValueTable>(Tables.OptionValue)
      .where({ custom_object_entry_id: CustomObjectEntryConstants.RedEntryID });

    expect(optionValues).toHaveLength(1);
    expect(optionValues[0].custom_object_entry_id).toBe(CustomObjectEntryConstants.RedEntryID);
  });

  test('returns Authorization error when no token is provided', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_OPTION_MUTATION,
        variables: {
          productId: ProductConstants.ID,
          input: [
            {
              order: 0,
              name: 'New Option',
              values: []
            }
          ]
        }
      });

    expect(res.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const CREATE_OPTION_MUTATION = /* GraphQL */ `
  mutation CreateOptionMutation($productId: ID!, $input: [CreateOptionInput!]!) {
    createOption(productId: $productId, input: $input) {
      id
      name
      values {
        id
        name
        customObjectEntry {
          id
          slug
        }
      }
    }
  }
`;
