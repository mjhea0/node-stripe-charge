const knex = require('../connection');

function getAllProducts() {
  return knex('products').select('*');
}

function getSingleProduct(productID) {
  return knex('products')
  .where('id', parseInt(productID))
  .first();
}

function addProduct(obj) {
  return knex('products').insert(obj).returning('*');
}

module.exports = {
  getAllProducts,
  getSingleProduct,
  addProduct
};
