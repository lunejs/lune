import type { Knex } from 'knex';

const TABLE_NAME = 'product_translation';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());

    table.string('name', 255).nullable();
    table.string('slug', 255).nullable();
    table.text('description').nullable();
    table.string('locale', 10).notNullable();

    table.uuid('product_id').notNullable().references('id').inTable('product');

    table
      .uuid('shop_id')
      .notNullable()
      .defaultTo(knex.raw(`(current_setting('app.current_shop_id'::text))::uuid`))
      .references('id')
      .inTable('shop');

    table.unique(['product_id', 'locale']);
    table.unique(['shop_id', 'slug', 'locale']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
