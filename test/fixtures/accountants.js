var id = require('pow-mongodb-fixtures').createObjectId;

exports.accountants = {
  taxminder: {
    _id: id('4ed2b809d7446b9a0e000014'),
    name: 'Tax Minder',
    email: 'hello@tax-minder.com',
    password: 'test'
  },

  easytax: {
    _id: id('4ed2b809d7446b9a0e000013'),
    name: 'Easy Tax',
    email: 'hello@easy-tax.com',
    password: 'test321'
  }
};
