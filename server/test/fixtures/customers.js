'use strict';

const id = require('pow-mongodb-fixtures').createObjectId;
const accountants = require('./accountants.js').accountants;

exports.customers = {
  kowalski: {
    _id: id('4ed2b809d7446b9a0e000001'),
    accountantId: accountants.taxminder._id,
    name: 'Jan Kowalski',
    companyName: 'PolKrak',
    email: 'kowalski@gmail.com',
    phone: '432324432',
    taxId: '9452121682',
    settlementPeriod: 'quarterly',
    vatPayer: true,
    socialSecurityPayer: true,
    hasEmployees: false
  },

  nowak: {
    _id: id('4ed2b809d7446b9a0e000002'),
    accountantId: accountants.easytax._id,
    name: 'Adam Nowak',
    companyName: 'AdNow',
    email: 'nowak@gmail.com',
    phone: '400300200',
    taxId: '679 008 56 13',
    settlementPeriod: 'monthly',
    vatPayer: true,
    socialSecurityPayer: true,
    hasEmployees: true
  }
};
