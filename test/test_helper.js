process.env.NODE_ENV = 'test';

if (process.env.NODE_ENV !== 'test') {
  console.error("Woops, you want NODE_ENV=test before you try this again!");
  process.exit(1);
}

var utils = require('./utils');
