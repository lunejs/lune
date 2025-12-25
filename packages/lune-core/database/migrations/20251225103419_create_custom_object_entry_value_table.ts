import type { Knex } from 'knex';

const TABLE_NAME = 'custom_object_entry_value';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());

    table.jsonb('value').notNullable();

    table
      .uuid('entry_id')
      .notNullable()
      .references('id')
      .inTable('custom_object_entry')
      .onDelete('CASCADE');

    table
      .uuid('field_id')
      .notNullable()
      .references('id')
      .inTable('custom_field_definition')
      .onDelete('CASCADE');

    table
      .uuid('shop_id')
      .notNullable()
      .defaultTo(knex.raw(`(current_setting('app.current_shop_id'::text))::uuid`))
      .references('id')
      .inTable('shop');

    table.unique(['shop_id', 'entry_id', 'field_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TABLE_NAME);
}
