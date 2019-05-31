const config = require('./config');

const morgan = require('morgan');

let format = 'dev';

if (config.LOG_FORMAT.toLowerCase() === 'none') {
  format = () => {};
}

module.exports = morgan(format);
