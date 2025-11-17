import type { Knex } from 'knex';

export async function resetDatabase(knex: Knex) {
  const tables = await knex.raw(
    `
    SELECT tablename 
    FROM pg_tables 
    WHERE schemaname = 'public'
      AND tablename NOT LIKE 'knex_migrations%';
  `
  );

  for (const row of tables.rows) {
    await knex.raw(`TRUNCATE TABLE "${row.tablename}" RESTART IDENTITY CASCADE`);
  }
}
