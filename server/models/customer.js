'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const emailRegex = require('../lib/email_regex');
const Schema = mongoose.Schema;

const Customer = new Schema({
  accountantId: {
    type: Schema.Types.ObjectId,
    required: true
  },

  name: {
    type: String,
    required: true,
    trim: true
  },

  companyName: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },

  phone: {
    type: String,
    trim: true
  },

  taxId: {
    type: String,
    trim: true,
    unique: true,
    required: true
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
    type: String
  },

  settlementPeriod: {
    type: String,
    enum: ['monthly', 'quarterly'],
    required: true
  },

  vatPayer: {
    type: Boolean,
    required: true
  },

  socialSecurityPayer: {
    type: Boolean,
    required: true
  },

  hasEmployees: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
});

Customer.pre('save', function (next) {
  this.taxId = this.taxId.replace(/[ -]/g, '');
  next();
});

Customer.plugin(uniqueValidator);

Customer.statics.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

Customer.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.encryptedPassword);
};

module.exports = mongoose.model('Customer', Customer);
