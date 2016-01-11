var express = require('express');
var router = express.Router();

/**
 * @api {get} /customers Get all customers
 * @apiName GetCustomers
 * @apiGroup Customer
 */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  res.send('create a customer');
});

module.exports = router;
