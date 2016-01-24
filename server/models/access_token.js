var config = require('../../config');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var AccessToken = new Schema({
    token: {
      type: String,
      required: true
    },

    createdAt: {
      type: Date,
      required: true,
      default: Date.now
    }
});

AccessToken.statics.encode = function(data) {
  return jwt.sign(data, config[process.env.NODE_ENV].secret_key);
};

AccessToken.statics.decode = function(data) {
  return jwt.decode(data, config[process.env.NODE_ENV].secret_key);
};

module.exports = mongoose.model('AccessToken', AccessToken);
