import type { Knex } from 'knex';

const TABLE_NAME = 'collection';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());

    table.string('name', 255).nullable();
    table.string('slug', 255).notNullable();
    table.text('description').nullable();
    table.boolean('enabled').notNullable().defaultTo(true);
    table.string('content_type').notNullable();
    table.integer('order').notNullable();

    table.uuid('parent_id').nullable().references('id').inTable(TABLE_NAME).onDelete('SET NULL');

    table
      .uuid('shop_id')
      .notNullable()
      .defaultTo(knex.raw(`(current_setting('app.current_shop_id'::text))::uuid`))
      .references('id')
      .inTable('shop');

    table.unique(['slug', 'shop_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
