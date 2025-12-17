import type { Knex } from 'knex';

const TABLE_NAME = 'customer_auth_method';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());

    table.string('provider').notNullable();
    table.string('provider_id').nullable();
    table.string('password').nullable();

    table.uuid('customer_id').notNullable().references('id').inTable('customer');

    table
      .uuid('shop_id')
      .notNullable()
      .defaultTo(knex.raw(`(current_setting('app.current_shop_id'::text))::uuid`))
      .references('id')
      .inTable('shop');

    table.unique(['customer_id', 'provider']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TABLE_NAME);
}
