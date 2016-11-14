exports.up = (knex, Promise) => {
  return knex.schema.createTable('transactions', (table) => {
    table.increments();
    table.string('stripe_transaction').notNullable();
    table.timestamp('purchase_time').notNullable().defaultTo(knex.raw('now()'));
    table.integer('product_id').references('id').inTable('products').notNullable();
    table.integer('user_id').references('id').inTable('users').notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('transactions');
};
