const knex = require('../connection');

function createTransaction(stripeID, productID, userID, cb) {
  return knex('transactions')
  .insert({
    stripe_transaction: stripeID,
    product_id: parseInt(productID),
    user_id: parseInt(userID)
  })
  .then(() => { cb(null); })
  .catch((err) => { cb(err); });
}

module.exports = {
  createTransaction
};
