import type { Knex } from 'knex';

const TABLE_NAME = 'custom_object_entry_value_translation';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());

    table.jsonb('value').nullable();
    table.string('locale', 10).notNullable();

    table
      .uuid('entry_value_id')
      .notNullable()
      .references('id')
      .inTable('custom_object_entry_value')
      .onDelete('CASCADE');

    table
      .uuid('shop_id')
      .notNullable()
      .defaultTo(knex.raw(`(current_setting('app.current_shop_id'::text))::uuid`))
      .references('id')
      .inTable('shop');

    table.unique(['shop_id', 'entry_value_id', 'locale']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
