import { knex, type Knex } from 'knex';
import { seedCountries } from './countries/countries.seed';
import { resetDatabase } from './reset-database';
import { LuneLogger } from '@/index';

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
