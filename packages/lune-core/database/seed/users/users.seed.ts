import type { Knex } from 'knex';
import bcrypt from 'bcrypt';

import { UserRepository } from '@/persistence/repositories/user-repository/user.repository';
import { LuneLogger } from '@/logger/lune.logger';

import Users from './users.json';

export async function seedUsers(trx: Knex.Transaction) {
  const userRepository = new UserRepository(trx);

  for (const user of Users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    await userRepository.create({
      email: user.email,
      password: hashedPassword
    });
  }

  LuneLogger.info(`Users inserted: ${Users.length}`);
}
