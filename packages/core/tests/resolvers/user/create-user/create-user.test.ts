import { VendyxServer } from '@/server';
import * as bcrypt from 'bcrypt';
import request from 'supertest';
import { CREATE_USER_MUTATION, createUserMock } from './create-user.mock';
import { TABLES } from '@/persistence/tables';
import { TestHelper } from '@/tests/utils/test-helper';

describe('createUser - Mutation', () => {
  // const testDatabase = new TestDatabase();
  const testHelper = new TestHelper();
  const q = testHelper.getQueryBuilder();

  const vendyxServer = new VendyxServer();
  const app = vendyxServer.getApp();

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await vendyxServer.teardown();
  });

  test('creates user with valid input', async () => {
    const res = await request(app)
      .post('/admin-api')
      .send({
        query: CREATE_USER_MUTATION,
        variables: {
          input: { email: 'admin@gmail.com', password: '12345678' }
        }
      });

    const { apiErrors, user } = res.body.data.createUser;

    expect(apiErrors).toEqual([]);
    expect(user.email).toBe('admin@gmail.com');
    expect(user.id).toMatch(TestHelper.Regex.UUID);
  });

  test('creates user with hashed password', async () => {
    const res = await request(app)
      .post('/admin-api')
      .send({
        query: CREATE_USER_MUTATION,
        variables: {
          input: { email: 'admin@gmail.com', password: '12345678' }
        }
      });

    const { apiErrors, user } = res.body.data.createUser;

    expect(apiErrors).toEqual([]);

    const userInDb = await q(TABLES.USERS).select('password').where({ id: user.id }).first();
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
          input: { email: 'email@gmail.com', password: '123' }
        }
      });

    const { apiErrors, user } = res.body.data.createUser;

    expect(apiErrors[0].code).toBe('INVALID_PASSWORD');
    expect(user).toBeNull();
  });

  test('returns EMAIL_ALREADY_EXISTS when email already exists', async () => {
    await q(TABLES.USERS).insert(createUserMock.userAlreadyCreated);

    const res = await request(app)
      .post('/admin-api')
      .send({
        query: CREATE_USER_MUTATION,
        variables: {
          input: createUserMock.userAlreadyCreated
        }
      });

    const { apiErrors, user } = res.body.data.createUser;

    expect(apiErrors[0].code).toBe('EMAIL_ALREADY_EXISTS');
    expect(user).toBeNull();
  });
});
