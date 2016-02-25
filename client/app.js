var express = require('express');
var logger = require('morgan');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.redirect('/index.html');
});

module.exports = app;
