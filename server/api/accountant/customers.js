'use strict';

const express = require('express');
const router = express.Router();
const mailer = require('../../lib/mailer');
const Customer = require('../../models/customer');
const Accountant = require('../../models/accountant');

/**
 * @api {post} /accountant/customers Create a customer
 * @apiName CreateCustomers
 * @apiGroup Customer
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} x-access-token Accountant unique access token
 *
 * @apiParam {String} name Customer full name
 * @apiParam {String} companyName Customer company name
 * @apiParam {String} email Customer Email
 * @apiParam {String} phone Customer Phone
 * @apiParam {String} taxId Customer Tax Id
 * @apiParam {String="monthly","quarterly"} settlementPeriod Customer settlement period
 * @apiParam {Boolean} settlementPeriod Customer pays VAT
 * @apiParam {Boolean} socialSecurityPayer Customer pays ZUS
 * @apiParam {Boolean} hasEmployees Customer has employees
 *
 * @apiSuccessExample Example data on success:
 * {
 *   _id: "asdfasdfasdffd",
 *   name: "Jan Kowalski",
 *   companyName: "PolKrak",
 *   email: "kowalski@gmail.com",
 *   phone: "+48 333 222 111",
 *   taxId: "PL123432134",
 *   settlementPeriod: "quarterly",
 *   settlementPeriod: true,
 *   socialSecurityPayer: true,
 *   hasEmployees: false,
 *   createdAt: "2016-01-30T22:44:22.353Z"
 * }
 */

router.post('/', function (req, res, next) {
  let customer = new Customer({
    accountantId: req.accountantId,
    name: req.body.name, companyName: req.body.companyName,
    email: req.body.email, phone: req.body.phone, taxId: req.body.taxId,
    settlementPeriod: req.body.settlementPeriod, vatPayer: req.body.vatPayer,
    socialSecurityPayer: req.body.socialSecurityPayer, hasEmployees: req.body.hasEmployees
  });

  customer.save(function (err) {
    if (err) { return next(err); }

    res.status(200).json(customer);
  });
});

/**
 * @api {get} /accountant/customers/:id Get customer data
 * @apiName GetCustomer
 * @apiGroup Customer
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} x-access-token Accountant unique access token
 *
 * @apiSuccess {String} name Customer full name
 * @apiSuccess {String} companyName Customer company name
 * @apiSuccess {String} email Customer Email
 * @apiSuccess {String} phone Customer Phone
 * @apiSuccess {String} taxId Customer Tax Id
 * @apiSuccess {String="monthly","quarterly"} settlementPeriod Customer settlement period
 * @apiSuccess {Boolean} settlementPeriod Customer pays VAT
 * @apiSuccess {Boolean} socialSecurityPayer Customer pays ZUS
 * @apiSuccess {Boolean} hasEmployees Customer has employees
 *
 * @apiSuccessExample Example data on success:
 * {
 *   _id: "asdfasdfasdffd",
 *   name: "Jan Kowalski",
 *   companyName: "PolKrak",
 *   email: "kowalski@gmail.com",
 *   phone: "+48 333 222 111",
 *   taxId: "PL123432134",
 *   settlementPeriod: "quarterly",
 *   vatPayer: true,
 *   socialSecurity_payer: true,
 *   hasEmployees: false,
 *   createdAt: "2016-01-30T22:44:22.353Z"
 * }
 */

router.get('/:id', function (req, res, next) {
  Customer.findOne({ accountantId: req.accountantId, _id: req.params.id }, function (err, customer) {
    if (err) {
      return next(err);
    }

    res.status(200).json(customer);
  });
});

/**
 * @api {put} /accountant/customers/:id Update customer
 * @apiName UpdateCustomers
 * @apiGroup Customer
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} x-access-token Accountant unique access token
 *
 * @apiParam {String} name Customer full name
 * @apiParam {String} companyName Customer company name
 * @apiParam {String} email Customer Email
 * @apiParam {String} phone Customer Phone
 * @apiParam {String} taxId Customer Tax Id
 * @apiParam {String="monthly","quarterly"} settlementPeriod Customer settlement period
 * @apiParam {Boolean} settlementPeriod Customer pays VAT
 * @apiParam {Boolean} socialSecurityPayer Customer pays ZUS
 * @apiParam {Boolean} hasEmployees Customer has employees
 *
 * @apiSuccess (204) null
 */

router.put('/:id', function (req, res, next) {
  let query = { accountantId: req.accountantId, _id: req.params.id };

  Customer.findOneAndUpdate(query, req.body, function (err, customer) {
    if (err) { return next(err); }

    res.status(204).json(null);
  });
});

/**
 * @api {put} /accountant/customers/:id/invitation Sent invitation to customer
 * @apiName InvitationCustomer
 * @apiGroup Customer
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} x-access-token Accountant unique access token
 * @apiSuccess (204) null
 */

router.put('/:id/invitation', function (req, res, next) {
  let query = { accountantId: req.accountantId, _id: req.params.id };

  Accountant.findById(req.accountantId, function (err, accountant) {
    if (err) { return next(err); }

    Customer.findOne(query, req.body, function (err, customer) {
      if (err) { return next(err); }

      mailer.accountantInvitation(accountant, customer, function (err) {
        if (err) { return next(err); }

        res.status(204).json(null);
      });
    });
  });
});

/**
 * @api {delete} /accountant/customers/:id Delete customer
 * @apiName DeleteCustomers
 * @apiGroup Customer
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} x-access-token Accountant unique access token
 *
 * @apiSuccess (204) null
 */

router.delete('/:id', function (req, res, next) {
  let query = { accountantId: req.accountantId, _id: req.params.id };

  Customer.remove(query, function (err) {
    if (err) { return next(err); }

    res.status(204).json(null);
  });
});

module.exports = router;
