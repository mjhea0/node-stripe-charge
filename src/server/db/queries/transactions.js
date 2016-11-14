const knex = require('../connection');

function getAllTransactions() {
  return knex('transactions').select('*');
}

function getTransactionsByUserID(userID) {
  return knex('transactions')
  .where('user_id', parseInt(userID));
}

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
  getAllTransactions,
  getTransactionsByUserID,
  createTransaction
};
