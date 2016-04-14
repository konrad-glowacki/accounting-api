'use strict';

const express = require('express');
const accountantAuth = require('../middlewares/auth').accountant;
const router = express.Router();

router.use('/api/accountants', require('./accountants'));
router.use('/api/accountant/customers', accountantAuth, require('./accountant/customers'));

module.exports = router;
