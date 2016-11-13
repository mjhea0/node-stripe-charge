const express = require('express');
const router = express.Router();

router.get('/ping', (req, res, next) => res.send('pong!'));

router.get('/', (req, res, next) => {
  const renderObject = {
    title: 'home',
    user: req.user,
    messages: req.flash('messages')
  };
  res.render('index', renderObject);
});

module.exports = router;
