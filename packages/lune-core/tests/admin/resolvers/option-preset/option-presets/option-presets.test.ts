import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { OptionPresetConstants, OptionPresetFixtures } from './fixtures/option-preset.fixtures';
import { OptionValuePresetFixtures } from './fixtures/option-value-preset.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('optionPresets - Query', () => {
  const testHelper = new TestHelper();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
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

  test('returns all option presets', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: OPTION_PRESETS_QUERY,
        variables: {}
      });

    const { optionPresets } = res.body.data;

    expect(optionPresets.items).toHaveLength(2);
    expect(optionPresets.count).toBe(2);

    expect(
      optionPresets.items.find(op => op.id === OptionPresetConstants.ColorOptionID)?.values.items
    ).toHaveLength(4);
    expect(
      optionPresets.items.find(op => op.id === OptionPresetConstants.SizeOptionID)?.values.items
    ).toHaveLength(3);
  });

  test('returns Authorization error when no token is provided', async () => {
    const res = await request(app).post('/admin-api').set('x_lune_shop_id', ShopConstants.ID).send({
      query: OPTION_PRESETS_QUERY,
      variables: {}
    });

    expect(res.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const OPTION_PRESETS_QUERY = /* GraphQL */ `
  query OptionPresetsQuery($input: ListInput) {
    optionPresets(input: $input) {
      count
      items {
        id
        name
        values {
          count
          items {
            id
            name
            metadata
          }
        }
      }
    }
  }
`;
