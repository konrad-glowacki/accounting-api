var express = require('express');
var router = express.Router();
var Accountant = require('../../models/accountant');
var AccessToken = require('../../models/access_token');

/**
 * @api {post} /accountants/register Create an accountant
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
 * @apiSuccess (201) {String} token Access Token for Accountant
 */

router.post('/register', function(req, res, next) {
  var accountant = new Accountant({ email: req.body.email });

  Accountant.register(accountant, req.body.password, function(err, accountant) {
    if (err) { return next(err); }
    res.status(201).send(null);
  });
});

/**
 * @api {post} /accountants/login Login an accountant
 * @apiName LoginAccountant
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

router.post('/login', function(req, res, next) {
  var query = Accountant.where({ email: req.body.email });

  query.findOne(function(err, accountant) {
    if (err) { return next(err); }

    if (accountant) {
      accountant.authenticate(req.body.password, function(err, accountant) {
        if (err) { return next(err); }

        var token = AccessToken.encode(accountant.email);

        accountant.token = AccessToken.create({ token: token });
        accountant.save(function(err, saved) {
          res.status(200).json({ token: accountant.token });
        });
      });
    } else {
      res.status(200).json({ message: 'User not found' });
    }
  });
});

/**
 * @api {get} /accountants/:id Get accountant
 * @apiName GetAccountant
 * @apiGroup Accountant
 * @apiVersion 0.1.0
 *
 * @apiSuccess {String} _id Accountant Id
 * @apiSuccess {String} name Accountant Name
 * @apiSuccess {String} email Accountant Email
 *
 * @apiSuccessExample Response example on success:
 * {
 *   "_id": "some-token-id",
 *   "name": "Ruda Kulka",
 *   "email": "accountant@example.com"
 * }
 */

router.get('/:id', function(req, res, next) {
  Accountant.findById(req.params.id, function(err, accountant) {
    if (err) { return next(err); }
    res.status(200).json({
      _id: accountant._id,
      name: accountant.name,
      email: accountant.email,
      createdAt: accountant.createdAt
    });
  });
});

module.exports = router;
