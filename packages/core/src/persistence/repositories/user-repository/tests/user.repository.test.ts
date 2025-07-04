import { Transaction } from '@/persistence/connection';
import { UserRepository } from '../user.repository';
import { TABLES } from '@/persistence/tables';
import { userRepositoryMock } from './user.repository.mock';
import { RepositoryError } from '../../repository.error';
import { TestHelper } from '@/tests/utils/test-helper';

describe('UserRepository', () => {
  let trx: Transaction;
  let repository: UserRepository;

  const testHelper = new TestHelper();
  const q = testHelper.getQueryBuilder();

  beforeEach(async () => {
    trx = await q.transaction();

    repository = new UserRepository(trx);
  });

  afterEach(async () => {
    await trx.rollback();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
  });

  describe('findByEmail', () => {
    test('returns undefined when email does not exist', async () => {
      const result = await repository.findByEmail('non.existing@email.com');

      expect(result).toBeUndefined();
    });

    test('returns user when email exists', async () => {
      const [user] = userRepositoryMock;

      await trx(TABLES.USERS).insert(user);

      const result = await repository.findByEmail(user.email as string);

      expect(result?.email).toBe(user.email);
    });

    test('throws RepositoryError when emailExists fails', async () => {
      jest.spyOn(repository, 'findOne').mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(repository.findByEmail('email')).rejects.toThrow(RepositoryError);
    });
  });
});
