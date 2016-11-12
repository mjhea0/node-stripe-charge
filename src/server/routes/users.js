const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/_helpers');

router.get('/:id', authHelpers.loginRequired, (req, res, next)  => {
  handleResponse(res, 200, 'success');
});

function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
}

module.exports = router;
