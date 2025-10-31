import * as bcrypt from 'bcrypt';
import request from 'supertest';

import { Tables } from '@/persistence/tables';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('createUser - Mutation', () => {
  const testHelper = new TestHelper();
  const q = testHelper.getQueryBuilder();

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

  test('creates user with valid input', async () => {
    const res = await request(app)
      .post('/admin-api')
      .send({
        query: CREATE_USER_MUTATION,
        variables: {
          input: { email: 'newemail@gmail.com', password: '12345678' }
        }
      });

    const { apiErrors, user } = res.body.data.createUser;

    expect(apiErrors).toEqual([]);
    expect(user.email).toBe('newemail@gmail.com');
    expect(user.id).toMatch(TestHelper.Regex.UUID);
  });

  test('creates user with hashed password', async () => {
    const res = await request(app)
      .post('/admin-api')
      .send({
        query: CREATE_USER_MUTATION,
        variables: {
          input: { email: 'newemail@gmail.com', password: '12345678' }
        }
      });

    const { apiErrors, user } = res.body.data.createUser;

    expect(apiErrors).toEqual([]);

    const userInDb = await q(Tables.Users).select('password').where({ id: user.id }).first();
    expect(await bcrypt.compare('12345678', userInDb.password)).toBe(true);
  });

  test('returns INVALID_EMAIL when email provided is invalid', async () => {
    const res = await request(app)
      .post('/admin-api')
      .send({
        query: CREATE_USER_MUTATION,
        variables: {
          input: { email: 'invalid-email', password: '12345678' }
        }
      });

    const { apiErrors, user } = res.body.data.createUser;

    expect(apiErrors[0].code).toBe('INVALID_EMAIL');
    expect(user).toBeNull();
  });

  test('returns INVALID_PASSWORD when password provided is invalid', async () => {
    const res = await request(app)
      .post('/admin-api')
      .send({
        query: CREATE_USER_MUTATION,
        variables: {
          input: { email: 'newemail@gmail.com', password: '123' }
        }
      });

    const { apiErrors, user } = res.body.data.createUser;

    expect(apiErrors[0].code).toBe('INVALID_PASSWORD');
    expect(user).toBeNull();
  });

  test('returns EMAIL_ALREADY_EXISTS when email already exists', async () => {
    const res = await request(app)
      .post('/admin-api')
      .send({
        query: CREATE_USER_MUTATION,
        variables: {
          input: { email: UserConstants.ExistingEmail, password: '12345678' }
        }
      });

    const { apiErrors, user } = res.body.data.createUser;

    expect(apiErrors[0].code).toBe('EMAIL_ALREADY_EXISTS');
    expect(user).toBeNull();
  });
});

export const CREATE_USER_MUTATION = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      apiErrors {
        code
        message
      }
      user {
        id
        email
      }
    }
  }
`;
