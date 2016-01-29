var express = require('express');
var router = express.Router();

router.use('/api/accountants', require('./accountants'));
router.use('/api/customers', require('./customers'));

module.exports = router;
