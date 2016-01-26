var id = require('pow-mongodb-fixtures').createObjectId;

var accountants = {
  taxminder: {
    _id: id('4ed2b809d7446b9a0e000014'),
    name: 'Tax Minder',
    email: 'hello@tax-minder.com',
    password: 'test',
    createdAt: Date.now()
  }
};

exports.accountants = accountants;
