var express = require('express');
var router = express.Router();
var Customer = require('../../models/customer');

/**
 * @api {post} /customers Create a customer
 * @apiName CreateCustomers
 * @apiGroup Customer
 * @apiVersion 0.1.0
 *
 * @apiSuccess {String} name Customer full name
 * @apiSuccess {String} companyName Customer company name
 * @apiSuccess {String} email Customer Email
 * @apiSuccess {String} phone Customer Phone
 * @apiSuccess {String} taxId Customer Tax Id
 *
 * @apiSuccessExample Example data on success:
 * {
 *   id: "asdfasdfasdffd",
 *   name: "Jan Kowalski",
 *   companyName: "PolKrak",
 *   email: "kowalski@gmail.com",
 *   phone: "+48 333 222 111",
 *   taxId: "PL123432134",
 *   createdAt: "PL123432134"
 * }
 */

router.post('/', function(req, res, next) {
  var customer = new Customer({
    accountant: req.accountant.id,
    name: req.body.name, companyName: req.body.companyName,
    email: req.body.email, phone: req.body.phone, taxId: req.body.taxId
  });

  customer.save(function(err) {
    if (err) { return next(err); }

    res.status(200).json({
      id: customer.id,
      name: customer.name,
      companyName: customer.companyName,
      email: customer.email,
      phone: customer.phone,
      taxId: customer.taxId,
      createdAt: customer.createdAt
    });
  });
});

module.exports = router;
