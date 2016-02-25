var express = require('express');
var logger = require('morgan');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/components', express.static(__dirname + '/bower_components'));

app.get('/', function(req, res){
  res.redirect('/index.html');
});

module.exports = app;
