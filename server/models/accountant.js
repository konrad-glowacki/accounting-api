'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const emailRegex = require('../lib/email_regex');
const Schema = mongoose.Schema;

const Accountant = new Schema({
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

  encryptedPassword: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

Accountant.plugin(uniqueValidator);

Accountant.statics.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

Accountant.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.encryptedPassword);
};

module.exports = mongoose.model('Accountant', Accountant);
