var config = require('../config');
var mongoose = require('mongoose');

mongoose.connect(config.test.mongodb);

helper = {
  apiServer: "http://localhost:6100"
};

module.exports = helper;
