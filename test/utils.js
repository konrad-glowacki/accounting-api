var mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'test') {
  console.log("Woops, you want NODE_ENV=test before you try this again!");
  process.exit(1);
}

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
