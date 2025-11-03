import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Enable RLS
  await knex.raw(`ALTER TABLE "payment_failure" ENABLE ROW LEVEL SECURITY`);
  await knex.raw(`ALTER TABLE "payment_failure" FORCE ROW LEVEL SECURITY`);

  await knex.raw(`
    CREATE POLICY shop_isolation_policy ON "payment_failure"
    USING (shop_id = current_setting('app.current_shop_id', TRUE)::uuid);
  `);

  // Bypass RLS policy
  await knex.raw(`
    CREATE POLICY bypass_rls_policy ON "payment_failure"
    USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP POLICY IF EXISTS owner_isolation_policy ON "payment_failure";
    DROP POLICY IF EXISTS shop_isolation_policy ON "payment_failure";
    DROP POLICY IF EXISTS bypass_rls_policy ON "payment_failure";
    ALTER TABLE "payment_failure" DISABLE ROW LEVEL SECURITY;
  `);
}
