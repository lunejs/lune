import type { UserTable } from '@/persistence/entities/user';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

const ID = TestHelper.generateUUID();
const Email = 'luna@snow.com';

export const UserConstants = {
  ID,
  Email,
  AccessToken: TestHelper.generateJWT({ sub: ID, email: Email })
};

export class UserFixtures implements Fixture<UserTable> {
  table = Tables.Users;

  async build(): Promise<Partial<UserTable>[]> {
    return [
      {
        id: UserConstants.ID,
        email: UserConstants.Email
      }
    ];
  }
}
