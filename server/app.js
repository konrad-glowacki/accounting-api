var config = require('./config');
var express = require('express');
var path = require('path');
var initializers = require('./initializers');
var app = express();

app.set('secret', config.secret);

if (app.get('env') !== 'test') {
  var logger = require('morgan');
  app.use(logger('dev'));
}

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./api'));

var errorHandlers = require('./middlewares/errors');
app.use(errorHandlers.validationError);
app.use(errorHandlers.notFound);
app.use(errorHandlers.internalError);

module.exports = app;
