import { UserTable } from '@/persistence/entities/user';
import { Tables } from '@/persistence/tables';
import { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

const ID = TestHelper.generateUUID();
const Email = 'magik@gmail.com';

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
        email: UserConstants.Email,
        password: await TestHelper.hashPassword('12345678'),
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
  }
}
