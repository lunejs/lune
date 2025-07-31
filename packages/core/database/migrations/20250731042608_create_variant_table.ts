import type { Knex } from 'knex';

const TABLE_NAME = 'variant';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable(TABLE_NAME, table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.timestamp('deleted_at', { useTz: true }).nullable();

    table.integer('sale_price').notNullable();
    table.integer('comparison_price').nullable();
    table.integer('cost_per_unit').nullable();
    table.integer('stock').notNullable().defaultTo(0);
    table.string('sku').nullable();
    table.boolean('requires_shipping').notNullable().defaultTo(false);
    table.float('weight').nullable();
    table.jsonb('dimensions').nullable();

    table.uuid('product_id').notNullable().references('id').inTable('product');

    table
      .uuid('shop_id')
      .notNullable()
      .defaultTo(knex.raw(`(current_setting('app.current_shop_id'::text))::uuid`))
      .references('id')
      .inTable('shop');
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists(TABLE_NAME);
}
