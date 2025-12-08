import type { UserTable } from '@/persistence/entities/user';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

const ID = TestUtils.generateUUID();
const Email = 'test@discount.com';

export const UserConstants = {
  ID,
  Email,
  AccessToken: TestUtils.generateJWT({ sub: ID, email: Email })
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
