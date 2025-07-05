import { Transaction } from '@/persistence/connection';
import { UserRepository } from '../user.repository';
import { RepositoryError } from '../../repository.error';
import { TestHelper } from '@/tests/utils/test-helper';
import { UserRepositoryConstants, UserRepositoryMock } from './user.repository.fixtures';

describe('UserRepository', () => {
  let trx: Transaction;
  let repository: UserRepository;

  const testHelper = new TestHelper();
  const q = testHelper.getQueryBuilder();

  beforeEach(async () => {
    trx = await q.transaction();

    await testHelper.loadFixtures([new UserRepositoryMock()]);
    repository = new UserRepository(trx);
  });

  afterEach(async () => {
    await trx.rollback();
    await testHelper.resetDatabase();
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
      const result = await repository.findByEmail('existing@gmail.com');

      expect(result?.email).toBe('existing@gmail.com');
    });

    test('throws RepositoryError when emailExists fails', async () => {
      jest.spyOn(repository, 'findOne').mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(repository.findByEmail('email')).rejects.toThrow(RepositoryError);
    });
  });

  describe('findById', () => {
    test('returns undefined when id does not exist', async () => {
      const result = await repository.findById(TestHelper.generateUUID());

      expect(result).toBeUndefined();
    });

    test('returns user when id exists', async () => {
      const result = await repository.findById(UserRepositoryConstants.UserId);

      expect(result?.id).toBe(UserRepositoryConstants.UserId);
    });

    test('throws RepositoryError when emailExists fails', async () => {
      jest.spyOn(repository, 'findOne').mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(repository.findById(UserRepositoryConstants.UserId)).rejects.toThrow(
        RepositoryError
      );
    });
  });
});
