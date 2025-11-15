import { knex, type Knex } from 'knex';
import { seedCountries } from './countries/countries.seed';
import { seedUsers } from './users/users.seed';
import { seedShops } from './shops/shops.seed';
import { seedProducts } from './products/products.seed';
import { seedCollections } from './collections/collections.seed';
import { resetDatabase } from './reset-database';
import { LuneLogger } from '@/logger/lune.logger';
import { Tables } from '@/persistence/tables';
import type { UserTable } from '@/persistence/entities/user';
import type { ShopTable } from '@/persistence/entities/shop';

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

  const user = await trx<UserTable>(Tables.Users)
    .where({ email: 'admin@admin.com' })
    .first();

  if (!user) {
    throw new Error("User 'admin@admin.com' is not present");
  }

  await seedShops(trx, { userId: user.id, shopId: '' });

  const shop = await trx<ShopTable>(Tables.Shop)
    .where({ slug: 'lune-store' })
    .first();

  if (!shop) {
    throw new Error("Shop 'lune-store' is not present");
  }

  await seedProducts(trx, { userId: user.id, shopId: shop.id });
  await seedCollections(trx, { userId: user.id, shopId: shop.id });
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
