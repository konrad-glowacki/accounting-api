var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var accountantSchema = new Schema({
  email: {
    type: String,
    required: true,
    match: emailRegex,
    trim: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

module.exports = mongoose.model('Accountant', accountantSchema);
