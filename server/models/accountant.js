var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

  token: {
    type: Object
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

Accountant.plugin(uniqueValidator);
Accountant.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('Accountant', Accountant);
