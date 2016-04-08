'use strict';

const config = require('./config');
const express = require('express');
const path = require('path');
const initializers = require('./initializers');
const app = express();

app.set('secret_key', config.secretKey);

if (app.get('env') !== 'test') {
  const logger = require('morgan');
  app.use(logger('dev'));
}

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./api'));

const errorHandlers = require('./middlewares/errors');
app.use(errorHandlers.validationError);
app.use(errorHandlers.notFound);
app.use(errorHandlers.internalError);

module.exports = app;
