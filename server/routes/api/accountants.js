var express = require('express');
var router = express.Router();
var Accountant = require('../../models/accountant');

/**
 * @api {get} /accountants/profile Get accountant data
 * @apiName GetAccountant
 * @apiGroup Accountant
 * @apiVersion 0.1.0
 *
 * @apiSuccess {String} name Accountant Name
 * @apiSuccess {String} email Accountant Email
 * @apiSuccess {Date} createdAt Accountant Created Date
 *
 * @apiSuccessExample Response example on success:
 * {
 *   "name": "Ruda Kulka",
 *   "email": "accountant@example.com",
 *   "createdAt": "some date",
 * }
 */

router.get('/profile', function(req, res, next) {
  Accountant.findById(req.userId, function(err, accountant) {
    if (err) { return next(err); }

    res.status(200).json({
      name: accountant.name,
      email: accountant.email,
      createdAt: accountant.createdAt
    });
  });
});

module.exports = router;
