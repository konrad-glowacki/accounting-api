var homepage = require('./homepage');
var users = require('./users');

var router = function(app) {
  app.use('/', homepage);
  app.use('/users', users);
};

module.exports = router;
