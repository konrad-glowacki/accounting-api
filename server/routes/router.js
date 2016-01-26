var homepage = require('./homepage');

var accountantsIndex = require('./api/accountants/index');
var customers = require('./api/customers');

var router = function(app) {
  app.use('/', homepage);
  app.use('/api/accountants', require('./api/accountants/public')(app));

  app.use('/api', require('./api/token_auth')(app));
  app.use('/api/accountants', accountantsIndex);
  app.use('/api/customers', customers);
};

module.exports = router;
