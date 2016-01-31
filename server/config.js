var config = {
  development: {
    "mongodb": "mongodb://localhost/accounting",
    "secret_key": "iz$7e6kd151qxku*879vsmh)i(mrj1ijyln-zf&nrdz!qoaaxg"
  },

  test: {
    "mongodb": "mongodb://localhost/test",
    "secret_key": "put-a-$Ecr3t-h3re"
  },

  production: {
    "mongodb": process.env.MONGODB_URL,
    "secret_key": process.env.SECRET_KEY
  }
};


module.exports = config[process.env.NODE_ENV || 'development'];
