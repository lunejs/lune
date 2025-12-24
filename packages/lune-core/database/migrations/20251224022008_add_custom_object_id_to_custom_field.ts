import type { Knex } from 'knex';

const TABLE_NAME = 'custom_field_definition';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, async table => {
    table
      .uuid('custom_object_definition_id')
      .nullable()
      .references('id')
      .inTable('custom_object_definition')
      .onDelete('CASCADE');

    table.dropUnique(['shop_id', 'applies_to_entity', 'key']);
  });

  await knex.raw(`
    CREATE UNIQUE INDEX custom_field_definition_shop_applies_key_unique
    ON custom_field_definition (shop_id, applies_to_entity, key)
    WHERE custom_object_definition_id IS NULL
  `);

  await knex.raw(`
    CREATE UNIQUE INDEX custom_field_definition_shop_custom_object_key_unique
    ON custom_field_definition (shop_id, custom_object_definition_id, key)
    WHERE custom_object_definition_id IS NOT NULL
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, async table => {
    table.dropColumn('custom_object_definition_id');

    await knex.raw('DROP INDEX IF EXISTS custom_field_definition_shop_applies_key_unique');
    await knex.raw('DROP INDEX IF EXISTS custom_field_definition_shop_custom_object_key_unique');

    await knex.schema.alterTable('custom_field_definition', table => {
      table.unique(['shop_id', 'applies_to_entity', 'key']);
    });
  });
}
