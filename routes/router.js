var homepage = require('./homepage');
var customers = require('./customers');

var router = function(app) {
  app.use('/', homepage);
  app.use('/customers', customers);
};

module.exports = router;
