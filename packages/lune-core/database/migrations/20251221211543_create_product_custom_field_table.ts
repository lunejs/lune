import type { Knex } from 'knex';

const TABLE_NAME = 'product_custom_field';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());

    table.jsonb('value').notNullable();

    table.uuid('product_id').notNullable().references('id').inTable('product');
    table.uuid('definition_id').notNullable().references('id').inTable('custom_field_definition');

    table
      .uuid('shop_id')
      .notNullable()
      .defaultTo(knex.raw(`(current_setting('app.current_shop_id'::text))::uuid`))
      .references('id')
      .inTable('shop');

    table.unique(['shop_id', 'product_id', 'definition_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TABLE_NAME);
}
