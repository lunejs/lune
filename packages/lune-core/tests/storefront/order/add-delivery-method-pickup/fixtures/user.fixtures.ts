import type { UserTable } from '@/persistence/entities/user';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

export const UserConstants = {
  ID: TestUtils.generateUUID()
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
