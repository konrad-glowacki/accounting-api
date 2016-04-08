global.__base = __dirname + '/';

const config = {
  development: {
    mongodb: 'mongodb://localhost/accounting',
    secretKey: 'iz$7e6kd151qxku*879vsmh)i(mrj1ijyln-zf&nrdz!qoaaxg',
    mailerUrl: 'smtp://localhost:1025'
  },

  test: {
    mongodb: 'mongodb://localhost/test',
    secretKey: 'put-a-$Ecr3t-h3re',
    mailerUrl: 'smtp://localhost:1025'
  },

  production: {
    mongodb: process.env.MONGOLAB_URI,
    secretKey: process.env.SECRET_KEY,
    mailerUrl: 'smtps://' + process.env.MANDRILL_USERNAME + ':' + process.env.MANDRILL_PASSWORD +
      '@smtp.mandrillapp.com'
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
