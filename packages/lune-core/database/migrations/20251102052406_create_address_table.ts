import type { Knex } from 'knex';

const TABLE_NAME = 'address';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());

    table.string('full_name').notNullable();
    table.string('street_line_1').notNullable();
    table.string('street_line_2').nullable();
    table.string('city').notNullable();
    table.string('postal_code').notNullable();
    table.string('phone_number', 15).notNullable();
    table.boolean('is_default').notNullable().defaultTo(false);
    table.text('references').nullable();
    
    table.uuid('country_id').notNullable().references('id').inTable('country');
    table.uuid('state_id').notNullable().references('id').inTable('state');

    table.uuid('customer_id').notNullable().references('id').inTable('customer');

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

