var homepage = require('./homepage');
var accountantsPublic = require('./api/accountants/public');

var tokenAuth = require('./api/token_auth');
var accountantsIndex = require('./api/accountants/index');
var customers = require('./api/customers');

var router = function(app) {
  app.use('/', homepage);
  app.use('/api/accountants', accountantsPublic);

  app.use('/api', tokenAuth);
  app.use('/api/accountants', accountantsIndex);
  app.use('/api/customers', customers);
};

module.exports = router;
