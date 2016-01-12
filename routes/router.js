var homepage = require('./homepage');
var accountants = require('./accountants');
var customers = require('./customers');

var router = function(app) {
  app.use('/', homepage);
  app.use('/accountants', accountants);
  app.use('/customers', customers);
};

module.exports = router;
