import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('whoami - Query', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([new UserFixtures()]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('returns current user', async () => {
    const response = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .send({
        query: WHOAMI_QUERY
      });

    const { whoami } = response.body.data;

    expect(whoami.id).toBe(UserConstants.ID);
    expect(whoami.email).toBe(UserConstants.Email);
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app).post('/admin-api').send({
      query: WHOAMI_QUERY
    });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

export const WHOAMI_QUERY = /* GraphQL */ `
  query Whoami {
    whoami {
      id
      email
    }
  }
`;
