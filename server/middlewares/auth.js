'use strict';

const config = require('../../config');
const jwt = require('jsonwebtoken');

// Route middleware to verify a token
let auth = function (type, req, res, next) {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.secretKey, function (err, decoded) {
      if (err) {
        return res.status(403).send('Failed to authenticate token');
      }

      req[type + 'Id'] = decoded;
      next();
    });
  } else {
    return res.status(403).send('No token provided');
  }
};

module.exports = {
  accountant: function (req, res, next) {
    auth('accountant', req, res, next);
  },

  customer: function (req, res, next) {
    auth('customer', req, res, next);
  }
};
