var express = require('express');
var accountantAuth = require('../middlewares/auth').accountant;
var router = express.Router();

router.get('/', function(req, res, next) {
  res.status(200).send('Welcome!');
});

router.use('/api/accountants', require('./accountants'));
router.use('/api/accountant/customers', accountantAuth, require('./customers'));

module.exports = router;
