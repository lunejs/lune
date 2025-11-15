import type { Knex } from 'knex';
import bcrypt from 'bcrypt';

import { LuneLogger } from '@/logger/lune.logger';
import { Tables } from '@/persistence/tables';
import type { UserTable } from '@/persistence/entities/user';

import Users from './users.json';

export async function seedUsers(trx: Knex.Transaction) {
  for (const user of Users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    await trx<UserTable>(Tables.Users).insert({
      email: user.email,
      password: hashedPassword
    });
  }

  LuneLogger.info(`Users inserted: ${Users.length}`);
}
