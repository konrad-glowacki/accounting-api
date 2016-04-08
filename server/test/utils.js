'use strict';

const mongoose = require('mongoose');
const fixtures = require('pow-mongodb-fixtures').connect('test');

before(function (done) {
  fixtures.clear(function (err) {
    if (err) {
      console.error('Cannot clear database');
      process.exit(1);
    }

    fixtures.load(__dirname + '/fixtures', function (err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      done();
    });
  });
});
