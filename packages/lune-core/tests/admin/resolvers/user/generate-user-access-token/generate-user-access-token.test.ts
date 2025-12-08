import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { UserFixtures } from './fixtures/user.fixtures';

describe('generateUserAccessToken - Mutation', () => {
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

  test('generates user access token with valid input', async () => {
    const res = await request(app)
      .post('/admin-api')
      .send({
        query: GENERATE_USER_ACCESS_TOKEN_MUTATION,
        variables: {
          input: { email: 'sam@gmail.com', password: '12345678' }
        }
      });

    const { apiErrors, accessToken } = res.body.data.generateUserAccessToken;

    expect(apiErrors).toEqual([]);
    expect(accessToken).toMatch(TestUtils.Regex.JWT);
  });

  test('returns INVALID_CREDENTIALS when email is incorrect', async () => {
    const res = await request(app)
      .post('/admin-api')
      .send({
        query: GENERATE_USER_ACCESS_TOKEN_MUTATION,
        variables: {
          input: { email: 'nonexisting.email@gmail.com', password: '12345678' }
        }
      });

    const { apiErrors, accessToken } = res.body.data.generateUserAccessToken;

    expect(apiErrors[0].code).toBe('INVALID_CREDENTIALS');
    expect(accessToken).toBeNull();
  });

  test('returns INVALID_CREDENTIALS when password is incorrect', async () => {
    const res = await request(app)
      .post('/admin-api')
      .send({
        query: GENERATE_USER_ACCESS_TOKEN_MUTATION,
        variables: {
          input: { email: 'sam@gmail.com', password: 'incorrect-password' }
        }
      });

    const { apiErrors, accessToken } = res.body.data.generateUserAccessToken;

    expect(apiErrors[0].code).toBe('INVALID_CREDENTIALS');
    expect(accessToken).toBeNull();
  });
});

export const GENERATE_USER_ACCESS_TOKEN_MUTATION = /* GraphQL */ `
  mutation generateUserAccessToken($input: GenerateUserAccessTokenInput!) {
    generateUserAccessToken(input: $input) {
      apiErrors {
        code
        message
      }
      accessToken
    }
  }
`;
