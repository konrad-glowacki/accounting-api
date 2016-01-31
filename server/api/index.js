var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.status(200).send('Welcome!');
});

router.use('/api/accountants', require('./accountants'));
router.use('/api/customers', require('./customers'));

module.exports = router;
