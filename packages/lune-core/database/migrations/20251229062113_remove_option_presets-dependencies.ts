import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('option_value', table => {
    table.dropColumn('option_value_preset_id');
  });

  await knex.schema.dropTableIfExists('option_value_preset');

  await knex.schema.dropTableIfExists('option_preset');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.createTable('option_preset', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    table.string('name').notNullable();
    table
      .uuid('shop_id')
      .notNullable()
      .defaultTo(knex.raw(`(current_setting('app.current_shop_id'::text))::uuid`))
      .references('id')
      .inTable('shop');
    table.unique(['name', 'shop_id']);
  });

  await knex.schema.createTable('option_value_preset', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    table.string('name').notNullable();
    table.jsonb('metadata').nullable();
    table.uuid('option_preset_id').notNullable().references('id').inTable('option_preset');
    table
      .uuid('shop_id')
      .notNullable()
      .defaultTo(knex.raw(`(current_setting('app.current_shop_id'::text))::uuid`))
      .references('id')
      .inTable('shop');
    table.unique(['name', 'option_preset_id']);
  });

  await knex.schema.alterTable('option_value', table => {
    table.uuid('option_value_preset_id').nullable().references('id').inTable('option_value_preset');
  });
}
