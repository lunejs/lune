import request from 'supertest';

import type { OptionValueTable } from '@/persistence/entities/option_value';
import { Tables } from '@/persistence/tables';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { OptionConstants, OptionFixtures } from './fixtures/option.fixtures';
import { OptionValueConstants, OptionValueFixtures } from './fixtures/option-value.fixtures';
import { ProductFixtures } from './fixtures/product.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('softRemoveOptionValue - Mutation', () => {
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

  test('soft remove option values', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: SOFT_REMOVE_OPTION_MUTATION,
        variables: {
          ids: [OptionValueConstants.BlueOptionValueID, OptionValueConstants.GreenOptionValueID]
        }
      });

    const { softRemoveOptionValues } = res.body.data;

    expect(softRemoveOptionValues).toBe(true);

    const optionValues = await testHelper
      .getQueryBuilder()<OptionValueTable>(Tables.OptionValue)
      .whereIn('id', [
        OptionValueConstants.BlueOptionValueID,
        OptionValueConstants.GreenOptionValueID
      ]);

    expect(optionValues?.every(opv => Boolean(opv.deleted_at))).toBe(true);
  });

  test('returns Authorization error when no token is provided', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: SOFT_REMOVE_OPTION_MUTATION,
        variables: {
          ids: [OptionConstants.ColorOptionID]
        }
      });

    expect(res.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const SOFT_REMOVE_OPTION_MUTATION = /* GraphQL */ `
  mutation SoftRemoveOptionValueMutation($ids: [ID!]!) {
    softRemoveOptionValues(ids: $ids)
  }
`;
