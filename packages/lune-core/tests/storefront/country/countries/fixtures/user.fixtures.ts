import type { UserTable } from '@/persistence/entities/user';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';

export const UserConstants = {
  ID: crypto.randomUUID()
};

export class UserFixtures implements Fixture<UserTable> {
  table: Tables = Tables.Users;

  async build(): Promise<Partial<UserTable>[]> {
    return [
      {
        id: UserConstants.ID,
        email: 'user@test.com'
      }
    ];
  }
}
