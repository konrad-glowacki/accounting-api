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
 * @apiSuccess {Date} created_at Accountant Created Date
 *
 * @apiSuccessExample Response example on success:
 * {
 *   "name": "Ruda Kulka",
 *   "email": "accountant@example.com",
 *   "created_at": "some date",
 * }
 */

router.get('/profile', function(req, res, next) {
  res.status(200).json({
    name: req.accountant.name,
    email: req.accountant.email,
    created_at: req.accountant.created_at
  });
});

module.exports = router;
