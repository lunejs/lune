import request from 'supertest';

import type { OptionTable } from '@/persistence/entities/option';
import { Tables } from '@/persistence/tables';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { OptionFixtures } from './fixtures/option.fixtures';
import { OptionPresetFixtures } from './fixtures/option-preset.fixtures';
import { OptionValueFixtures } from './fixtures/option-value.fixtures';
import {
  OptionValuePresetConstants,
  OptionValuePresetFixtures
} from './fixtures/option-value-preset.fixtures';
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
      new OptionPresetFixtures(),
      new OptionValuePresetFixtures()
    ]);
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

  test('creates option with preset values', async () => {
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
                { order: 0, presetId: OptionValuePresetConstants.RedPresetID },
                { order: 1, presetId: OptionValuePresetConstants.BluePresetID }
              ]
            }
          ]
        }
      });

    const { createOption } = res.body.data;

    expect(createOption[0].name).toBe('Color');
    expect(createOption[0].values).toHaveLength(2);

    expect(createOption[0].values[0]).toMatchObject({
      name: 'Red',
      preset: {
        id: OptionValuePresetConstants.RedPresetID,
        name: 'Red',
        metadata: { hex: '#FF0000' }
      }
    });

    // expect(createOption[0]).toMatchObject({
    //   name: 'Color',
    //   values: [
    //     { presetId: OptionValuePresetConstants.RedPresetID },
    //     { presetId: OptionValuePresetConstants.BluePresetID }
    //   ]
    // });

    // const productOptions = await testHelper
    //   .getQueryBuilder()<OptionTable>(Tables.Option)
    //   .where({ product_id: ProductConstants.WithNoOptions });

    // expect(productOptions).toHaveLength(1);
  });

  // test('creates option mixing custom and preset values', async () => {
  //   const res = await request(app)
  //     .post('/admin-api')
  //     .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
  //     .set('x_lune_shop_id', ShopConstants.ID)
  //     .send({
  //       query: CREATE_OPTION_MUTATION,
  //       variables: {
  //         productId: ProductConstants.WithNoOptions,
  //         input: [
  //           {
  //             order: 0,
  //             name: 'Color',
  //             values: [
  //               { order: 0, presetId: OptionValuePresetConstants.RedPresetID },
  //               { order: 1, name: 'Custom Yellow' },
  //               { order: 2, presetId: OptionValuePresetConstants.BluePresetID }
  //             ]
  //           }
  //         ]
  //       }
  //     });

  //   const { createOption } = res.body.data;

  //   expect(createOption[0]).toMatchObject({
  //     name: 'Color'
  //   });

  //   expect(createOption[0].values[0]).toMatchObject({
  //     presetId: OptionValuePresetConstants.RedPresetID
  //   });
  //   expect(createOption[0].values[1]).toMatchObject({
  //     name: 'Custom Yellow'
  //   });
  //   expect(createOption[0].values[2]).toMatchObject({
  //     presetId: OptionValuePresetConstants.BluePresetID
  //   });
  // });

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
        preset {
          id
          name
          metadata
        }
      }
    }
  }
`;
