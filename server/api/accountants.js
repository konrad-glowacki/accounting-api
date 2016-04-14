'use strict';

const config = require('../../config');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const accountantAuth = require('../middlewares/auth').accountant;
const Accountant = require('../models/accountant');

/**
 * @api {post} /accountants/signup Create an accountant
 * @apiName CreateAccountant
 * @apiGroup Accountant
 * @apiVersion 0.1.0
 *
 * @apiParam {String} email Accountant email
 * @apiParam {String} password Accountant password
 *
 * @apiParamExample {json} Request example:
 * {
 *   "email": "accountant@example.com",
 *   "password": "some-password"
 * }
 *
 * @apiSuccess (201) {String} email Accountant email
 */

router.post('/signup', function (req, res, next) {
  let accountant = new Accountant({
    email: req.body.email,
    encryptedPassword: Accountant.generateHash(req.body.password)
  });

  accountant.save(function (err) {
    if (err) { return next(err); }

    res.status(201).json({
      email: accountant.email
    });
  });
});

/**
 * @api {post} /accountants/authenticate Get access token for an accountant
 * @apiName AuthenticateAccountant
 * @apiGroup Accountant
 * @apiVersion 0.1.0
 *
 * @apiParam {String} email Accountant email
 * @apiParam {String} password Accountant password
 *
 * @apiParamExample {json} Request example:
 * {
 *   "email": "accountant@example.com",
 *   "password": "password"
 * }
 *
 * @apiSuccess {String} token Accountant access token
 *
 * @apiSuccessExample Response example on success:
 * {
 *   "token": "some-access-token"
 * }
 */

router.post('/authenticate', function (req, res, next) {
  Accountant.where({ email: req.body.email }).findOne(function (err, accountant) {
    if (err) { return next(err); }

    if (accountant && accountant.verifyPassword(req.body.password)) {
      let token = jwt.sign(accountant.id, config.secretKey);
      res.status(200).json({ token: token });
    } else {
      res.status(200).json({ message: 'User not found' });
    }
  });
});

/**
 * @api {get} /accountants/profile Get accountant data
 * @apiName GetAccountant
 * @apiGroup Accountant
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} x-access-token Accountant unique access token
 *
 * @apiSuccess {String} name Accountant Name
 * @apiSuccess {String} email Accountant Email
 *
 * @apiSuccessExample Response example on success:
 * {
 *   "name": "Ruda Kulka",
 *   "email": "accountant@example.com"
 * }
 */

router.get('/profile', accountantAuth, function (req, res, next) {
  Accountant.findById(req.accountantId, function (err, accountant) {
    res.status(200).json({
      name: accountant.name,
      email: accountant.email,
      createdAt: accountant.createdAt
    });
  });
});

module.exports = router;
