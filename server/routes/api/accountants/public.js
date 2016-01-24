var config = require('../../../../config');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Accountant = require('../../../models/accountant');

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
 * @apiSuccess (201)
 */

router.post('/signup', function(req, res, next) {
  var accountant = new Accountant({ email: req.body.email });

  Accountant.register(accountant, req.body.password, function(err, accountant) {
    if (err) { return next(err); }
    res.status(201).send(null);
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

router.post('/authenticate', function(req, res, next) {
  Accountant.where({ email: req.body.email }).findOne(function(err, accountant) {
    if (err) { return next(err); }

    if (accountant) {
      accountant.authenticate(req.body.password, function(err, accountant) {
        if (err) { return next(err); }

        var token = jwt.sign(accountant, config[process.env.NODE_ENV].secret, {
          expiresIn: 60 * 60 * 24
        });

        res.status(200).json({ token: token });
      });
    } else {
      res.status(200).json({ message: 'User not found' });
    }
  });
});

module.exports = router;
