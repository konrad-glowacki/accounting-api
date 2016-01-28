var express = require('express');
var router = express.Router();

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
  res.status(200).json({
    name: req.accountant.name,
    email: req.accountant.email,
    createdAt: req.accountant.createdAt
  });
});

module.exports = router;
