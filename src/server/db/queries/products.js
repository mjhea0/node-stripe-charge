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

function updateProduct(productID, obj) {
  return knex('products')
  .update(obj)
  .where('id', parseInt(productID))
  .returning('*');
}

function deleteProduct(productID) {
  return knex('products')
  .where('id', parseInt(productID))
  .del()
  .returning('*');
}

module.exports = {
  getAllProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct
};
