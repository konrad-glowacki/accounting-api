'use strict';

const config = require('./config');
const express = require('express');
const path = require('path');
const initializers = require('./server/initializers');
const app = express();

app.set('secretKey', config.secretKey);

if (app.get('env') !== 'test') {
  const logger = require('morgan');
  app.use(logger('dev'));
}

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('./server/api'));
app.use('/apidoc', express.static(path.join(__dirname, 'server/apidoc')));
app.use('/components', express.static(path.join(__dirname, 'client/components')));
app.use('/', express.static(path.join(__dirname, 'client/public')));

app.get('/', function (req, res) {
  res.redirect('/index.html');
});

const errorHandlers = require('./server/middlewares/errors');

app.use(errorHandlers.validationError);
app.use(errorHandlers.notFound);
app.use(errorHandlers.internalError);

module.exports = app;
