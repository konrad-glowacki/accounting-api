var id = require('pow-mongodb-fixtures').createObjectId;
var accountants = require('./accountants.js').accountants;

exports.customers = {
  kowalski: {
    _id: id('4ed2b809d7446b9a0e000001'),
    accountant_id: accountants.taxminder._id,
    name: 'Jan Kowalski',
    company_name: 'PolKrak',
    email: 'kowalski@gmail.com',
    phone: '432324432',
    tax_id: '9452121682',
    settlement_period: 'quarterly',
    vat_payer: true,
    social_security_payer: true,
    has_employees: false
  },

  nowak: {
    _id: id('4ed2b809d7446b9a0e000002'),
    accountant_id: accountants.easytax._id,
    name: 'Adam Nowak',
    company_name: 'AdNow',
    email: 'nowak@gmail.com',
    phone: '400300200',
    tax_id: '679 008 56 13',
    settlement_period: 'monthly',
    vat_payer: true,
    social_security_payer: true,
    has_employees: true
  }
};
