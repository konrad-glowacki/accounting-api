'use strict';

const express = require('express');
const accountantAuth = require('../middlewares/auth').accountant;
const router = express.Router();

router.get('/', function (req, res, next) {
  res.status(200).send('Welcome!');
});

router.use('/api/accountants', require('./accountants'));
router.use('/api/accountant/customers', accountantAuth, require('./accountant/customers'));

module.exports = router;
