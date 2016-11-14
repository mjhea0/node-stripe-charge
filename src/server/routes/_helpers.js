const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const productQueries = require('../db/queries/products');
const transactionQueries = require('../db/queries/transactions');

function validateProduct(productID, productAmount) {
  return new Promise((resolve, reject) => {
    // (1) does the product exist?
    return productQueries.getSingleProduct(productID)
    .then((product) => {
      if (!product) return reject('Product not found');
      // (2) does the product amount align?
      if (productAmount !== product.amount) {
        return reject('Incorrect Product');
      }
      return resolve(product);
    })
    .catch((err) => {
      return reject(err);
    });
  });
}

function createCharge(charge, productID, userID) {
  return new Promise((resolve, reject) => {
    stripe.charges.create(charge, (err, res) => {
      if (err) return reject(err);
      // create transaction
      transactionQueries.createTransaction(
        res.id, productID, userID, (err) => {
        if (err) return reject(err);
        return resolve();
      });
    });
  });
}

module.exports = {
  validateProduct,
  createCharge
};
