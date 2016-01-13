module.exports = {
  test: {
    secret: 'some-secret',
    database: 'mongodb://localhost/accounting_test',
  },

  development: {
    secret: 'c!pg)f24u4(_*z7hw0@w!k0r#@57+fd83w6jhksok+tqv$z*6x',
    database: 'mongodb://localhost/accounting',
  },

  production: {
    secret: 'e_ogam)d7r%u#6o1_j$4b_k=#ec&6fzb!lv5l=7u*t-)jn=+dc',
    database: 'mongodb://@localhost:27017/sample_api',
  },
};
