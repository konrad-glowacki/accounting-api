var express = require('express');
var router = express.Router();
var Accountant = require('../../models/accountant');

/**
 * @api {post} /accountants Create an accountant
 * @apiName CreateAccountant
 * @apiGroup Accountant
 * @apiVersion 0.1.0
 *
 * @apiParam {String} email Accountant email
 * @apiParam {String} password Accountant password
 *
 * @apiParamExample {json} Request example:
 * {
 *   "name": "Ruda Kulka",
 *   "email": "accountant@example.com",
 *   "password": "some-password"
 * }
 *
 * @apiSuccess {String} _id Accountant Id
 * @apiSuccess {String} name Accountant Name
 * @apiSuccess {String} email Accountant Email
 *
 * @apiSuccessExample Response example on success:
 * {
 *   "name": "Ruda Kulka",
 *   "email": "accountant@example.com"
 * }
 */

router.post('/', function(req, res, next) {
  var accountant = new Accountant(req.body);

  accountant.save(function(err) {
    if (err) { return next(err); }

    res.status(200).json({
      _id: accountant._id,
      name: accountant.name,
      email: accountant.email
    });
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
