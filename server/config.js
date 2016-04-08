global.__base = __dirname + '/';

var config = {
  development: {
    mongodb: 'mongodb://localhost/accounting',
    secret_key: 'iz$7e6kd151qxku*879vsmh)i(mrj1ijyln-zf&nrdz!qoaaxg',
    mailer_url: 'smtp://localhost:1025'
  },

  test: {
    mongodb: 'mongodb://localhost/test',
    secret_key: 'put-a-$Ecr3t-h3re',
    mailer_url: 'smtp://localhost:1025'
  },

  production: {
    mongodb: process.env.MONGOLAB_URI,
    secret_key: process.env.SECRET_KEY,
    mailer_url: 'smtps://' + process.env.MANDRILL_USERNAME + ':' + process.env.MANDRILL_PASSWORD + '@smtp.mandrillapp.com'
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
