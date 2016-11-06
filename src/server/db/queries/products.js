const knex = require('../connection');

function getAllProducts() {
  return knex('products').select('*');
}

function getSingleProduct(productID) {
  return knex('products')
  .where('id', parseInt(productID))
  .first();
}

module.exports = {
  getAllProducts,
  getSingleProduct
};
