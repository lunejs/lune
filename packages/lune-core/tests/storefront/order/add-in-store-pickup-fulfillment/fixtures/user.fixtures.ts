import type { UserTable } from '@/persistence/entities/user';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

export const UserConstants = {
  ID: TestHelper.generateUUID()
};

export class UserFixtures implements Fixture<UserTable> {
  table: Tables = Tables.Users;

  async build(): Promise<Partial<UserTable>[]> {
    return [
      {
        id: UserConstants.ID,
        email: 'ellie@williams.com'
      }
    ];
  }
}
