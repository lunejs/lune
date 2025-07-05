import { UserTable } from '@/persistence/entities/user';
import { Tables } from '@/persistence/tables';
import { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

export const UserRepositoryConstants = {
  UserId: TestHelper.generateUUID()
};

export class UserRepositoryMock implements Fixture<UserTable> {
  table = Tables.Users;

  async build(): Promise<Partial<UserTable>[]> {
    return [
      {
        id: UserRepositoryConstants.UserId,
        email: 'existing@gmail.com',
        password: 'hashed-password-1'
      }
    ];
  }
}
