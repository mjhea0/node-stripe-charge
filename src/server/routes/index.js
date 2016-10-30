const express = require('express'),
  router = express.Router();


router.get('/', (req, res) => {
  res.render('index', {
    user: req.user,
    message: req.flash('message')[0]
  });
});

router.get('/ping', (req, res) => {
  res.send('pong!');
});


module.exports = router;
