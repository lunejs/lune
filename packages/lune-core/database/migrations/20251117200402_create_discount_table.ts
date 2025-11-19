import type { Knex } from 'knex';

const TABLE_NAME = 'discount';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.timestamp('deleted_at', { useTz: true }).nullable();

    table.string('code').notNullable();
    table.enum('application_mode', ['CODE', 'AUTOMATIC']).notNullable();
    table.enum('application_level', ['ORDER', 'ORDER_LINE', 'FULFILLMENT']).notNullable();
    table.smallint('per_customer_limit').nullable();
    table.timestamp('starts_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.timestamp('ends_at', { useTz: true }).nullable();
    table.boolean('enabled').notNullable().defaultTo(true);
    table.boolean('combinable').notNullable().defaultTo(false);
    table.jsonb('handler').notNullable();

    table
      .uuid('shop_id')
      .notNullable()
      .defaultTo(knex.raw(`(current_setting('app.current_shop_id'::text))::uuid`))
      .references('id')
      .inTable('shop');

    table.unique(['shop_id', 'code']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
