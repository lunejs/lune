import type { UserTable } from '@/persistence/entities/user';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

const UserID = TestUtils.generateUUID();

export const UserConstants = {
  ID: UserID,
  Email: 'user@test.com',
  AccessToken: TestUtils.generateJWT({ sub: UserID, email: 'user@test.com' })
};

export class UserFixtures implements Fixture<UserTable> {
  table: Tables = Tables.Users;

  async build(): Promise<Partial<UserTable>[]> {
    return [
      {
        id: UserConstants.ID,
        email: UserConstants.Email
      }
    ];
  }
}
