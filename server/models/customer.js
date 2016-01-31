var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var emailRegex = require('../lib/email_regex');
var Schema = mongoose.Schema;

var Customer = new Schema({
  accountant: {
    type: Schema.Types.ObjectId,
    required: true
  },

  name: {
    type: String,
    required: true,
    trim: true
  },

  company_name: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },

  phone: {
    type: String,
    trim: true
  },

  tax_id: {
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

  encrypted_password: {
    type: String
  },

  settlement_period: {
    type: String,
    enum: ['monthly', 'quarterly'],
    required: true
  },

  vat_payer: {
    type: Boolean,
    required: true
  },

  social_security_payer: {
    type: Boolean,
    required: true
  },

  has_employees: {
    type: Boolean,
    required: true
  },

  created_at: {
    type: Date,
    required: true,
    default: Date.now
  }
});

Customer.pre('save', function(next) {
  this.tax_id = this.tax_id.replace(/[ -]/g,'');
  next();
});

Customer.plugin(uniqueValidator);

Customer.statics.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

Customer.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.encrypted_password);
};

module.exports = mongoose.model('Customer', Customer);
