import type { UserTable } from '@/persistence/entities/user';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

const ID = TestHelper.generateUUID();

export const UserConstants = {
  ID
};

export class UserFixtures implements Fixture<UserTable> {
  table = Tables.Users;

  async build(): Promise<Partial<UserTable>[]> {
    return [
      {
        id: UserConstants.ID
      }
    ];
  }
}
