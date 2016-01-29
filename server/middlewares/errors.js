var env = process.env.NODE_ENV || 'development';

function internalError(err, req, res, next) {
  if (env === 'production') {
    res.status(err.status || 500);
    res.render('error', { message: err.message, error: {} });
  } else if (env === 'development') {
    res.status(err.status || 500);
    res.render('error', { message: err.message, error: err });
  } else {
    res.status(err.status || 500);
    res.render('error', { message: err.message, error: err });
  }
}

function notFound(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
}

var validationError = function (err, req, res, next) {
  if (err.name == 'ValidationError') {
    res.status(422).json({ code: 'ValidationError', errors: err.errors });
  } else {
    next(err);
  }
};

module.exports = {
  notFound: notFound,
  internalError: internalError,
  validationError: validationError
};
