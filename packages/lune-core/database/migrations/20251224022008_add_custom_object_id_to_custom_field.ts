import type { Knex } from 'knex';

const TABLE_NAME = 'custom_field_definition';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, table => {
    table
      .uuid('custom_object_definition_id')
      .nullable()
      .references('id')
      .inTable('custom_object_definition')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, table => {
    table.dropColumn('custom_object_definition_id');
  });
}
