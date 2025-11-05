import type { Knex } from 'knex';

const TABLE_NAME = 'order_line';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());

    table.integer('unit_price').notNullable();
    table.integer('line_subtotal').notNullable();
    table.integer('line_total').notNullable();
    table.integer('quantity').notNullable();

    table.uuid('order_id').notNullable().references('id').inTable('orders');
    table.uuid('variant_id').notNullable().references('id').inTable('variant');

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
