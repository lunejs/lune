import type { Knex } from 'knex';

const TABLE_NAME = 'orders';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());

    table.integer('code').nullable().unique();
    table
      .enu('state', [
        'MODIFYING',
        'PLACED',
        'PROCESSING',
        'SHIPPED',
        'DELIVERED',
        'READY_FOR_PICKUP',
        'CANCELED',
        'COMPLETED'
      ])
      .notNullable()
      .defaultTo('MODIFYING');
    table.integer('total').notNullable();
    table.integer('subtotal').notNullable();
    table.integer('total_quantity').notNullable();
    table.jsonb('shipping_address').nullable();
    table.timestamp('placed_at', { useTz: true }).notNullable();
    table.timestamp('completed_at', { useTz: true }).notNullable();

    table.uuid('customer_id').nullable().references('id').inTable('customer');

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
