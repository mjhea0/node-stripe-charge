exports.seed = (knex, Promise) => {
  return Promise.all([
    knex('products').del()
  ]);
};
