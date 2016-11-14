const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/_helpers');
const transactionQueries = require('../db/queries/transactions');
const userQueries = require('../db/queries/users');

router.get('/:id', authHelpers.loginRequired, (req, res, next)  => {
  const userID = parseInt(req.params.id);
  userQueries.getUserByID(userID)
  .then((user) => {
    if (!user) {
      throw new Error('User does not exist');
    }
    transactionQueries.getTransactionsByUserID(userID);
  })
  .then((transactions) => {
    const renderObject = {
      title: 'user profile',
      user: req.user,
      transactions: transactions,
      messages: req.flash('messages')
    };
    res.render('profile', renderObject);
  })
  .catch((err) => { next(err); });

});

module.exports = router;
