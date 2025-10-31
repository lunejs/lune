import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { OptionConstants, OptionFixtures } from './fixtures/option.fixtures';
import { OptionValueConstants, OptionValueFixtures } from './fixtures/option-value.fixtures';
import { ProductFixtures } from './fixtures/product.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('updateOption - Mutation', () => {
  const testHelper = new TestHelper();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new ProductFixtures(),
      new OptionFixtures(),
      new OptionValueFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('update simple option', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_OPTION_MUTATION,
        variables: {
          id: OptionConstants.ColorOptionID,
          input: {
            order: 5,
            name: 'Updated name'
          }
        }
      });

    const { updateOption } = res.body.data;

    expect(updateOption.name).toBe('Updated name');
    expect(updateOption.order).toBe(5);
    expect(updateOption.values).toHaveLength(3);
  });

  test('add option values to option', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_OPTION_MUTATION,
        variables: {
          id: OptionConstants.WithNoValues,
          input: {
            values: [
              { name: 'Value 1', order: 0 },
              { name: 'Value 2', order: 1 },
              { name: 'Value 3', order: 2 }
            ]
          }
        }
      });

    const { updateOption } = res.body.data;

    expect(updateOption.name).toBe('With no values');
    expect(updateOption.values[0]).toMatchObject({ name: 'Value 1' });
    expect(updateOption.values[1]).toMatchObject({ name: 'Value 2' });
    expect(updateOption.values[2]).toMatchObject({ name: 'Value 3' });
  });

  test('update an option value and remove remaining', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_OPTION_MUTATION,
        variables: {
          id: OptionConstants.ColorOptionID,
          input: {
            values: [{ id: OptionValueConstants.GreenOptionValueID, name: 'Green plates' }]
          }
        }
      });

    const { updateOption } = res.body.data;

    expect(updateOption.values).toHaveLength(1);
    expect(
      updateOption.values.find(v => v.id === OptionValueConstants.GreenOptionValueID).name
    ).toBe('Green plates');
  });

  test('update an option value and persist remaining', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_OPTION_MUTATION,
        variables: {
          id: OptionConstants.ColorOptionID,
          input: {
            values: [
              { id: OptionValueConstants.RedOptionValueID, name: 'Red' },
              { id: OptionValueConstants.GreenOptionValueID, name: 'Green plates' },
              { id: OptionValueConstants.BlueOptionValueID, name: 'Blue' }
            ]
          }
        }
      });

    const { updateOption } = res.body.data;

    expect(updateOption.values).toHaveLength(3);
    expect(
      updateOption.values.find(v => v.id === OptionValueConstants.GreenOptionValueID).name
    ).toBe('Green plates');
  });

  test('returns Authorization error when no token is provided', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: UPDATE_OPTION_MUTATION,
        variables: {
          id: OptionConstants.ColorOptionID,
          input: {
            order: 5,
            name: 'Updated name'
          }
        }
      });

    expect(res.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const UPDATE_OPTION_MUTATION = /* GraphQL */ `
  mutation UpdateOptionMutation($id: ID!, $input: UpdateOptionInput!) {
    updateOption(id: $id, input: $input) {
      id
      name
      order
      values {
        id
        name
      }
    }
  }
`;
