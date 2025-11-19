import type { Knex } from 'knex';

const TABLE_NAME = 'discount_usage';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.timestamp('applied_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());

    table.uuid('discount_id').notNullable().references('id').inTable('discount');
    table.uuid('customer_id').notNullable().references('id').inTable('customer');

    table
      .uuid('shop_id')
      .notNullable()
      .defaultTo(knex.raw(`(current_setting('app.current_shop_id'::text))::uuid`))
      .references('id')
      .inTable('shop');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
