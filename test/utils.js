var mongoose = require('mongoose');

before(function(done) {
  mongoose.connection.on('open', done);
});

after(function(done) {
  mongoose.connection.db.dropDatabase(function() {
    mongoose.connection.close(function() {
      done();
    });
  });
});
