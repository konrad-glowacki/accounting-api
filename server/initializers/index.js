'use strict';

const config = require('../config');
const mongoose = require('mongoose');

mongoose.connect(config.mongodb);
