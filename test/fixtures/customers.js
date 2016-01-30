var id = require('pow-mongodb-fixtures').createObjectId;
var accountants = require('./accountants.js').accountants;

exports.customers = {
  kowalski: {
    _id: id('4ed2b809d7446b9a0e000000'),
    accountant: accountants.taxminder,
    name: 'Jan Kowalski',
    company_name: 'PolKrak',
    email: 'kowalski@gmail.com',
    phone: '432324432',
    tax_id: '9452121682',
    settlement_period: 'quarterly'
  }
};
