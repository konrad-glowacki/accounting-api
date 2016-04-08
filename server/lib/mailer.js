'use strict';

const pug = require('pug');
const config = require('../config');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(config.mailerUrl);
const mailer = {};

const templatePath = function (name) {
  return __base + '/templates/mailers/' + name + '.pug';
};

mailer.accountantInvitation = function (accountant, customer, callback) {
  let mailOptions = {
    from: accountant.name + ' <' + accountant.email + '>',
    to: customer.email,
    subject: 'Activate your account in accounting app',
    html: pug.renderFile(templatePath('accountant_invitation'), {
      customer: customer, accountant: accountant
    })
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) { return callback(err); }

    callback(null, info);
  });
};

module.exports = mailer;
