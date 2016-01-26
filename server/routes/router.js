var router = function(app) {
  app.use('/', require('./homepage'));
  app.use('/api/accountants', require('./api/public/accountants')(app));

  app.use('/api', require('./api/token_auth')(app));
  app.use('/api/accountants', require('./api/accountants'));
  app.use('/api/customers', require('./api/customers'));
};

module.exports = router;
