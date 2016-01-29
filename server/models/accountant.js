var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var emailRegex = require('../lib/email_regex');
var Schema = mongoose.Schema;

var Accountant = new Schema({
  name: {
    type: String,
    trim: true
  },

  email: {
    type: String,
    required: true,
    match: emailRegex,
    trim: true,
    lowercase: true,
    unique: true,
    index: {
      unique: true
    }
  },

  encrypted_password: {
    type: String,
    required: true
  },

  created_at: {
    type: Date,
    required: true,
    default: Date.now
  }
});

Accountant.plugin(uniqueValidator);

Accountant.statics.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

Accountant.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.encrypted_password);
};

module.exports = mongoose.model('Accountant', Accountant);
