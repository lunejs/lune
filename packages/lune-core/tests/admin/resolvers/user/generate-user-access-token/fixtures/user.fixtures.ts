import type { UserTable } from '@/persistence/entities/user';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

export class UserFixtures implements Fixture<UserTable> {
  table = Tables.Users;

  async build(): Promise<Partial<UserTable>[]> {
    return [
      {
        id: TestUtils.generateUUID(),
        email: 'sam@gmail.com',
        password: await TestUtils.hashPassword('12345678'),
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
  }
}
