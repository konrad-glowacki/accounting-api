var express = require('express');
var router = express.Router();

/**
 * @api {post} /customers Create a customer
 * @apiName CreateCustomers
 * @apiGroup Customer
 * @apiVersion 0.1.0
 *
 * @apiSuccess {Integer} id Customer ID
 * @apiSuccess {String} first_name First Name
 * @apiSuccess {String} last_name Last Name
 *
 * @apiSuccessExample Example data on success:
 * {
 *   id: 12,
 *   first_name: "Jan",
 *   last_name: "Kowalski"
 * }
 */

router.post('/', function(req, res, next) {
  res.send('create a customer');
});

module.exports = router;
