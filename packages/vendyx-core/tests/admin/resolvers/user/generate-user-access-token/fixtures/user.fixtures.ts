import { UserTable } from '@/persistence/entities/user';
import { Tables } from '@/persistence/tables';
import { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

export class UserFixtures implements Fixture<UserTable> {
  table = Tables.Users;

  async build(): Promise<Partial<UserTable>[]> {
    return [
      {
        id: TestHelper.generateUUID(),
        email: 'sam@gmail.com',
        password: await TestHelper.hashPassword('12345678'),
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
  }
}
