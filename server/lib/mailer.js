var jade = require('jade');
var config = require('../config');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport(config.mailer_url);
var mailer = {};

var Promise = require("bluebird");

var templatePath = function(name) {
  return __base + '/templates/mailers/' + name + '.jade';
};

mailer.accountantInvitation = function(accountant, customer, recipients) {
  var mailOptions = {
    from: accountant.name + '<' + accountant.email + '>',
    to: customer.email,
    subject: "Activate your account in accounting app",
    html: jade.renderFile(templatePath('accountant_invitation'), {
      customer: customer, accountant: accountant
    })
  };

  return new Promise(function(resolve, reject) {
    transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        reject(err);
      } else {
        resolve(info.response);
      }
    });
  });
};

module.exports = mailer;
