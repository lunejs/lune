import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { CountryConstants, CountryFixtures } from './fixtures/country.fixtures';
import { StateFixtures } from './fixtures/state.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('countries - Query', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([new UserFixtures(), new CountryFixtures(), new StateFixtures()]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('returns all countries', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .send({
        query: COUNTRIES_QUERY
      });

    const { countries } = res.body.data;

    expect(countries).toHaveLength(2);

    expect(countries[0].id).toBe(CountryConstants.MxID);
    expect(countries[1].id).toBe(CountryConstants.UsID);

    expect(countries[0].states).toHaveLength(32);
    expect(countries[1].states).toHaveLength(50);
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app).post('/admin-api').send({
      query: COUNTRIES_QUERY
    });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const COUNTRIES_QUERY = /* GraphQL */ `
  query Countries {
    countries {
      id
      name
      code
      states {
        id
        name
        code
      }
    }
  }
`;
