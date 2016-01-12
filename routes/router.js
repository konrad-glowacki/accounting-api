var homepage = require('./homepage');

var accountants = require('./api/accountants');
var customers = require('./api/customers');

var router = function(app) {
  app.use('/', homepage);

  app.use('/api/accountants', accountants);
  app.use('/api/customers', customers);
};

module.exports = router;
