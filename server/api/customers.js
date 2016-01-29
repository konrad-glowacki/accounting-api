var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');
var Customer = require('../models/customer');

/**
 * @api {post} /customers Create a customer
 * @apiName CreateCustomers
 * @apiGroup Customer
 * @apiVersion 0.1.0
 *
 * @apiSuccess {String} name Customer full name
 * @apiSuccess {String} company_name Customer company name
 * @apiSuccess {String} email Customer Email
 * @apiSuccess {String} phone Customer Phone
 * @apiSuccess {String} tax_id Customer Tax Id
 *
 * @apiSuccessExample Example data on success:
 * {
 *   id: "asdfasdfasdffd",
 *   name: "Jan Kowalski",
 *   company_name: "PolKrak",
 *   email: "kowalski@gmail.com",
 *   phone: "+48 333 222 111",
 *   tax_id: "PL123432134",
 *   created_at: "PL123432134"
 * }
 */

router.post('/', auth, function(req, res, next) {
  var customer = new Customer({
    accountant: req.accountant.id,
    name: req.body.name, company_name: req.body.company_name,
    email: req.body.email, phone: req.body.phone, tax_id: req.body.tax_id
  });

  customer.save(function(err) {
    if (err) { return next(err); }

    res.status(200).json({
      id: customer.id,
      name: customer.name,
      company_name: customer.company_name,
      email: customer.email,
      phone: customer.phone,
      tax_id: customer.tax_id,
      created_at: customer.created_at
    });
  });
});

/**
 * @api {get} /customers/:id Get customer data
 * @apiName GetCustomer
 * @apiGroup Customer
 * @apiVersion 0.1.0
 *
 * @apiSuccess {String} name Accountant Name
 * @apiSuccess {String} email Accountant Email
 * @apiSuccess {Date} created_at Accountant Created Date
 *
 * @apiSuccessExample Response example on success:
 * {
 *   "name": "Ruda Kulka",
 *   "email": "accountant@example.com",
 *   "created_at": "some date",
 * }
 */

router.get('/:id', auth, function(req, res, next) {
  res.status(200).json({
    id: req,
    name: req,
    company_name: req,
    email: req.accountant.email,
    phone: req,
    tax_id: req,
    created_at: req.accountant.created_at
  });
});

module.exports = router;
