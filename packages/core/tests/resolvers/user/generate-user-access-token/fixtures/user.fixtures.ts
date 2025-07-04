import { UserTable } from '@/persistence/entities/user';
import { TABLES } from '@/persistence/tables';
import { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

export const buildUserFixtures = async (): Promise<Fixture<UserTable>> => ({
  table: TABLES.USERS,
  fixtures: [
    {
      id: TestHelper.generateUUID(),
      email: 'sam@gmail.com',
      password: await TestHelper.hashPassword('12345678'),
      created_at: new Date(),
      updated_at: new Date()
    }
  ]
});
