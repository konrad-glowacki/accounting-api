var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Accountant = require('../../models/accountant');

module.exports = function(app) {
  // route middleware to verify a token
  router.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, app.get('secret'), function(err, decoded) {
        if (err) {
          return res.status(403).send('Failed to authenticate token');
        } else {
          Accountant.findById(decoded, function(err, accountant) {
            if (err) { return next(err); }
            req.accountant = accountant;
            next();
          });
        }
      });
    } else {
      return res.status(403).send('No token provided');
    }
  });

  return router;
};
