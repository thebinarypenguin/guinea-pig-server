const config = require('./src/config');

module.exports = {
  client     : config.DB_CLIENT,
  connection : config.DB_CONNECTION_STRING,
};
