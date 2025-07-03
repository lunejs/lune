import { Transaction } from '@/persistence/connection';
import { setupTestDb } from '../../../../../tests/setup-db';
import { UserRepository } from '../user.repository';
import { TABLES } from '@/persistence/tables';
import { userRepositoryMock } from './user.repository.mock';
import { RepositoryError } from '../../repository.error';

describe('UserRepository', () => {
  const database = setupTestDb();
  let trx: Transaction;
  let repository: UserRepository;

  beforeEach(async () => {
    trx = await database.transaction();

    repository = new UserRepository(trx);
  });

  afterEach(async () => {
    await trx.rollback();
  });

  afterAll(async () => {
    await database.destroy();
  });

  describe('emailExists', () => {
    test('returns undefined when email does not exist', async () => {
      const result = await repository.emailExists('non.existing@email.com');

      expect(result).toBeUndefined();
    });

    test('returns user when email exists', async () => {
      const [user] = userRepositoryMock;

      await trx(TABLES.USERS).insert(user);

      const result = await repository.emailExists(user.email as string);

      expect(result?.email).toBe(user.email);
    });

    test('throws RepositoryError when emailExists fails', async () => {
      jest.spyOn(repository, 'findOne').mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(repository.emailExists('email')).rejects.toThrow(RepositoryError);
    });
  });
});
