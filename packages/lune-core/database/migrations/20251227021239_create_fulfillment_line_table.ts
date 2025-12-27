import type { Knex } from 'knex';

const TABLE_NAME = 'fulfillment_line';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());

    table.integer('quantity').notNullable();

    table
      .uuid('fulfillment_id')
      .notNullable()
      .references('id')
      .inTable('fulfillment')
      .onDelete('CASCADE');

    table
      .uuid('order_line_id')
      .notNullable()
      .references('id')
      .inTable('order_line')
      .onDelete('CASCADE');

    table
      .uuid('shop_id')
      .notNullable()
      .defaultTo(knex.raw(`(current_setting('app.current_shop_id'::text))::uuid`))
      .references('id')
      .inTable('shop');

    table.index(['shop_id', 'fulfillment_id']);
    table.index(['shop_id', 'order_line_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
