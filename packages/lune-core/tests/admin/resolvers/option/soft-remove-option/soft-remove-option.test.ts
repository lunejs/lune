import request from 'supertest';

import type { OptionTable } from '@/persistence/entities/option';
import { Tables } from '@/persistence/tables';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { OptionConstants, OptionFixtures } from './fixtures/option.fixtures';
import { OptionValueFixtures } from './fixtures/option-value.fixtures';
import { ProductFixtures } from './fixtures/product.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('softRemoveOption - Mutation', () => {
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

  test('soft remove an option', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: SOFT_REMOVE_OPTION_MUTATION,
        variables: {
          id: OptionConstants.ColorOptionID
        }
      });

    const { softRemoveOption } = res.body.data;

    expect(softRemoveOption.name).toBe('Color');
    expect(softRemoveOption.values).toHaveLength(3);

    const option = await testHelper
      .getQueryBuilder()<OptionTable>(Tables.Option)
      .where({ id: OptionConstants.ColorOptionID })
      .first();

    expect(option?.deleted_at).not.toBeFalsy();
  });

  test('returns Authorization error when no token is provided', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: SOFT_REMOVE_OPTION_MUTATION,
        variables: {
          id: OptionConstants.ColorOptionID
        }
      });

    expect(res.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const SOFT_REMOVE_OPTION_MUTATION = /* GraphQL */ `
  mutation SoftRemoveOptionMutation($id: ID!) {
    softRemoveOption(id: $id) {
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
