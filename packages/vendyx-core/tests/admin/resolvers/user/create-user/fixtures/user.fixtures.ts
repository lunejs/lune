import type { UserTable } from '@/persistence/entities/user';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

export const UserConstants = {
  ExistingEmail: 'existing@email.com'
};

export class UserFixtures implements Fixture<UserTable> {
  table = Tables.Users;

  async build(): Promise<Partial<UserTable>[]> {
    return [
      {
        id: TestHelper.generateUUID(),
        email: UserConstants.ExistingEmail,
        password: await TestHelper.hashPassword('12345678'),
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
  }
}
