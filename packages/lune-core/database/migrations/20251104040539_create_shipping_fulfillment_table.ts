import type { Knex } from 'knex';

const TABLE_NAME = 'shipping_fulfillment';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());

    table.string('tracking_code').notNullable();
    table.string('carrier').notNullable();
    table.timestamp('shipped_at', { useTz: true }).notNullable();
    table.timestamp('delivered_at', { useTz: true }).notNullable();

    table.uuid('fulfillment_id').notNullable().references('id').inTable('fulfillment');

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
