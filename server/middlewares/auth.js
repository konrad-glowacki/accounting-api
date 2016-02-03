var config = require('../config');
var jwt = require('jsonwebtoken');

// route middleware to verify a token
var auth = function(type, req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.secret_key, function(err, decoded) {
      if (err) {
        return res.status(403).send('Failed to authenticate token');
      } else {
        req[type + '_id'] = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send('No token provided');
  }
};

module.exports = {
  accountant: function(req, res, next) {
    auth('accountant', req, res, next);
  },

  customer: function(req, res, next) {
    auth('customer', req, res, next);
  }
};
