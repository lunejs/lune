import { Transaction } from '@/persistence/connection';
import { recordsMock, TestEntity, TestRepository } from './repository.mock';
import { RepositoryError } from '../../repository.error';
import { TestHelper } from '@/tests/utils/test-helper';
import { SortKey } from '../repository';

const TEST_TABLE_NAME = 'test_table';

describe('Repository', () => {
  let trx: Transaction;
  let repository: TestRepository;

  const testHelper = new TestHelper();
  const q = testHelper.getQueryBuilder();

  beforeAll(async () => {
    await q.schema.createTable(TEST_TABLE_NAME, table => {
      table.uuid('id').primary();
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.boolean('is_active').notNullable();
      table.timestamp('created_at').defaultTo(q.fn.now());
      table.timestamp('updated_at').defaultTo(q.fn.now());
      table.timestamp('deleted_at').nullable();
    });
  });

  afterAll(async () => {
    await q.schema.dropTableIfExists(TEST_TABLE_NAME);
    await testHelper.destroyDatabase();
  });

  beforeEach(async () => {
    trx = await q.transaction();

    await trx(TEST_TABLE_NAME).insert(recordsMock);

    repository = new TestRepository(TEST_TABLE_NAME, trx);
  });

  afterEach(async () => {
    await trx.rollback();
  });

  describe('findOne', () => {
    test('returns undefined when no record matches', async () => {
      const result = await repository.findOne({ where: { email: 'non.existing@email.com' } });

      expect(result).toBeUndefined();
    });

    test('return the first record when there are no filters provided', async () => {
      const result = await repository.findOne({ where: {} });

      expect(result).toMatchObject({
        id: recordsMock[0].id,
        email: recordsMock[0].email,
        password: recordsMock[0].password,
        isActive: recordsMock[0].is_active,
        deletedAt: null,
        createdAt: recordsMock[0].created_at,
        updatedAt: recordsMock[0].updated_at
      });
    });

    test('returns the first record that matches the provided filters', async () => {
      const result = await repository.findOne({ where: { email: recordsMock[1].email } });

      expect(result).toMatchObject({
        id: recordsMock[1].id,
        email: recordsMock[1].email,
        password: recordsMock[1].password,
        isActive: recordsMock[1].is_active,
        deletedAt: null,
        createdAt: recordsMock[1].created_at,
        updatedAt: recordsMock[1].updated_at
      });
    });

    test('returns record with the provided fields', async () => {
      const result = await repository.findOne({
        where: { email: recordsMock[2].email },
        fields: ['id', 'email']
      });

      expect(result).toMatchObject({
        id: recordsMock[2].id,
        email: recordsMock[2].email
      });
    });
  });

  describe('findMany', () => {
    test('returns all records when filters are not provided', async () => {
      const result = await repository.findMany({});

      expect(result).toHaveLength(recordsMock.length);
      expect(result).toEqual(
        expect.arrayContaining(
          recordsMock.map(record => ({
            id: record.id,
            email: record.email,
            password: record.password,
            isActive: record.is_active,
            deletedAt: null,
            createdAt: record.created_at,
            updatedAt: record.updated_at
          }))
        )
      );
    });

    test('returns empty array when no records match the provided filters', async () => {
      const result = await repository.findMany({ where: { email: 'non.existing@email.com' } });

      expect(result).toHaveLength(0);
    });

    test('returns all records that match the where clause', async () => {
      const result = await repository.findMany({ where: { isActive: true } });

      expect(result).toHaveLength(2);
      expect(result).toEqual(
        expect.arrayContaining(
          recordsMock
            .filter(record => record.is_active)
            .map(record => ({
              id: record.id,
              email: record.email,
              password: record.password,
              isActive: record.is_active,
              deletedAt: null,
              createdAt: record.created_at,
              updatedAt: record.updated_at
            }))
        )
      );
    });

    test('returns records with the provided fields', async () => {
      const result = await repository.findMany({
        where: { isActive: true },
        fields: ['id', 'email']
      });

      expect(result).toHaveLength(2);
      expect(result).toEqual(
        expect.arrayContaining(
          recordsMock
            .filter(record => record.is_active)
            .map(record => ({
              id: record.id,
              email: record.email
            }))
        )
      );
    });

    test('returns limited number of records', async () => {
      const result = await repository.findMany({ take: 1 });

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        id: recordsMock[0].id,
        email: recordsMock[0].email,
        password: recordsMock[0].password,
        isActive: recordsMock[0].is_active,
        deletedAt: null,
        createdAt: recordsMock[0].created_at,
        updatedAt: recordsMock[0].updated_at
      });
    });

    test('returns records with skip', async () => {
      const result = await repository.findMany({ skip: 1 });

      expect(result).toHaveLength(recordsMock.length - 1);
      expect(result[0]).toMatchObject({
        id: recordsMock[1].id,
        email: recordsMock[1].email,
        password: recordsMock[1].password,
        isActive: recordsMock[1].is_active,
        deletedAt: null,
        createdAt: recordsMock[1].created_at,
        updatedAt: recordsMock[1].updated_at
      });
    });

    test('returns records ordered by a specific field', async () => {
      const result = await repository.findMany({
        orderBy: { createdAt: SortKey.Desc }
      });

      expect(result).toHaveLength(recordsMock.length);
      expect(result[0].createdAt.getTime()).toBeGreaterThanOrEqual(result[1].createdAt.getTime());
    });
  });

  describe('count', () => {
    test('returns the total number of records', async () => {
      const count = await repository.count({ where: {} });

      expect(count).toBe(recordsMock.length);
    });

    test('returns the count of records that match the provided filters', async () => {
      const count = await repository.count({ where: { isActive: true } });

      expect(count).toBe(2);
    });

    test('returns 0 when no records match the provided filters', async () => {
      const count = await repository.count({ where: { email: 'nonexisting@gmail.com' } });

      expect(count).toBe(0);
    });
  });

  describe('create', () => {
    test('creates a new record and returns it', async () => {
      const input: TestEntity = {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        email: 'sam@gmail.com',
        password: 'password123',
        isActive: true
      };

      const createdRecord = await repository.create(input);

      expect(createdRecord).toMatchObject({
        id: expect.any(String),
        email: input.email,
        password: input.password,
        isActive: input.isActive,
        deletedAt: null,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      });

      expect(await trx(TEST_TABLE_NAME).where({ id: createdRecord.id })).toHaveLength(1);
    });

    test('throws RepositoryError when creation fails', async () => {
      const invalidInput = {
        foo: 'bar'
      };

      await expect(repository.create(invalidInput as unknown as TestEntity)).rejects.toThrow(
        RepositoryError
      );
    });
  });

  describe('update', () => {
    test('updates an existing record and returns it', async () => {
      const input = {
        password: 'new_password'
      };

      const updatedRecord = await repository.update({
        where: { id: recordsMock[0].id },
        data: input
      });

      expect(updatedRecord.id).toBe(recordsMock[0].id);
      expect(updatedRecord.password).toBe(input.password);

      expect(await trx(TEST_TABLE_NAME).where({ id: updatedRecord.id })).toHaveLength(1);
    });

    test('updates updatedAt field automatically', async () => {
      const input = {
        password: 'new_password'
      };

      const oldRecord = await trx(TEST_TABLE_NAME).where({ id: recordsMock[0].id }).first();

      const updatedRecord = await repository.update({
        where: { id: recordsMock[0].id },
        data: input
      });

      expect(updatedRecord.updatedAt).not.toEqual(recordsMock[0].updated_at);
      expect(updatedRecord.updatedAt.getTime()).toBeGreaterThan(
        new Date(oldRecord.updated_at).getTime()
      );
    });

    test('throws RepositoryError when update fails', async () => {
      const invalidInput = {
        foo: 'bar'
      };

      await expect(repository.create(invalidInput as unknown as TestEntity)).rejects.toThrow(
        RepositoryError
      );
    });
  });

  describe('remove', () => {
    test('removes an existing record', async () => {
      const input = { where: { id: recordsMock[0].id } };

      await repository.remove(input);

      expect(await trx(TEST_TABLE_NAME).where(input.where)).toHaveLength(0);
    });

    test('throws RepositoryError when removal fails', async () => {
      const invalidInput = { where: { id: 'non-existing-id' } };

      await expect(repository.remove(invalidInput)).rejects.toThrow(RepositoryError);
    });
  });

  describe('softRemove', () => {
    test('soft removes an existing record', async () => {
      const input = { where: { id: recordsMock[0].id } };

      await repository.softRemove(input);

      const record = await trx(TEST_TABLE_NAME).where(input.where).first();
      expect(record).toBeDefined();
      expect(record.deleted_at).toBeDefined();
    });

    test('throws RepositoryError when soft removal fails', async () => {
      const invalidInput = { where: { id: 'non-existing-id' } };

      await expect(repository.softRemove(invalidInput)).rejects.toThrow(RepositoryError);
    });
  });

  describe('createMany', () => {
    test('creates multiple records and returns them', async () => {
      const inputs: TestEntity[] = [
        {
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
          email: 'sam@gmail.com',
          password: 'password123',
          isActive: true
        },
        {
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
          email: 'lluvia@gmail.com',
          password: 'password456',
          isActive: true
        }
      ];

      const createdRecords = await repository.createMany(inputs);

      expect(createdRecords).toHaveLength(2);
      expect(createdRecords).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            email: inputs[0].email,
            password: inputs[0].password,
            isActive: inputs[0].isActive,
            deletedAt: null,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
          }),
          expect.objectContaining({
            id: expect.any(String),
            email: inputs[1].email,
            password: inputs[1].password,
            isActive: inputs[1].isActive,
            deletedAt: null,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
          })
        ])
      );
    });
  });
});
