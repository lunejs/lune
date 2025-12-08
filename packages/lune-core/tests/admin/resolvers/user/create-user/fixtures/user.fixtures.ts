import type { UserTable } from '@/persistence/entities/user';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

export const UserConstants = {
  ExistingEmail: 'existing@email.com'
};

export class UserFixtures implements Fixture<UserTable> {
  table = Tables.Users;

  async build(): Promise<Partial<UserTable>[]> {
    return [
      {
        id: TestUtils.generateUUID(),
        email: UserConstants.ExistingEmail,
        password: await TestUtils.hashPassword('12345678'),
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
  }
}
