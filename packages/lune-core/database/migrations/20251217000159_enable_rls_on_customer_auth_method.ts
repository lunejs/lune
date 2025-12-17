import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Enable RLS
  await knex.raw(`ALTER TABLE "customer_auth_method" ENABLE ROW LEVEL SECURITY`);
  await knex.raw(`ALTER TABLE "customer_auth_method" FORCE ROW LEVEL SECURITY`);

  await knex.raw(`
    CREATE POLICY shop_isolation_policy ON "customer_auth_method"
    USING (shop_id = current_setting('app.current_shop_id', TRUE)::uuid);
  `);

  // Bypass RLS policy
  await knex.raw(`
    CREATE POLICY bypass_rls_policy ON "customer_auth_method"
    USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP POLICY IF EXISTS owner_isolation_policy ON "customer_auth_method";
    DROP POLICY IF EXISTS shop_isolation_policy ON "customer_auth_method";
    DROP POLICY IF EXISTS bypass_rls_policy ON "customer_auth_method";
    ALTER TABLE "customer_auth_method" DISABLE ROW LEVEL SECURITY;
  `);
}
