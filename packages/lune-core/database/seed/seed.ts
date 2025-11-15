import { knex, type Knex } from 'knex';
import { seedCountries } from './countries/countries.seed';
import { seedUsers } from './users/users.seed';
import { seedShops } from './shops/shops.seed';
import { resetDatabase } from './reset-database';
import { UserRepository } from '@/persistence/repositories/user-repository';
import { LuneLogger } from '@/logger/lune.logger';

let trx: Knex.Transaction;
let db: Knex;

async function main() {
  LuneLogger.setLevels(['info', 'error']);

  db = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL
  });

  await resetDatabase(db);

  trx = await db.transaction();

  await seedCountries(trx);
  await seedUsers(trx);

  const userRepository = new UserRepository(trx);
  const user = await userRepository.findByEmail('admin@admin.com');

  if (!user) {
    throw new Error("User 'admin@admin.com' is not present");
  }

  await seedShops(trx, { userId: user.id, shopId: '' });
}

main()
  .catch(err => {
    console.log(err);
    trx.rollback();
    LuneLogger.error(Error('Seed failed'));
  })
  .then(() => {
    trx.commit();
    LuneLogger.ready('Seed completed');
  })
  .finally(() => db.destroy());
