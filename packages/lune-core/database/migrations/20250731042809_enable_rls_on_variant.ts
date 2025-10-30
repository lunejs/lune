import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Enable RLS
  await knex.raw(`ALTER TABLE "variant" ENABLE ROW LEVEL SECURITY`);
  await knex.raw(`ALTER TABLE "variant" FORCE ROW LEVEL SECURITY`);

  await knex.raw(`
    CREATE POLICY shop_isolation_policy ON "variant"
    USING (shop_id = current_setting('app.current_shop_id', TRUE)::uuid);
  `);

  // Bypass RLS policy
  await knex.raw(`
    CREATE POLICY bypass_rls_policy ON "variant"
    USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP POLICY IF EXISTS owner_isolation_policy ON "variant";
    DROP POLICY IF EXISTS shop_isolation_policy ON "variant";
    DROP POLICY IF EXISTS bypass_rls_policy ON "variant";
    ALTER TABLE "variant" DISABLE ROW LEVEL SECURITY;
  `);
}
