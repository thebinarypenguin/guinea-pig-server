const config = require('./config');

const knex = require('knex');
const app  = require('./app');
const pkg  = require('../package.json');

const db = knex({
  client     : config.DB_CLIENT,
  connection : config.DB_CONNECTION_STRING,
});

app.set('db', db);

app.listen(config.PORT, config.HOST, () => {

  /* eslint-disable-next-line no-console */
  console.log(`${pkg.name}@${pkg.version} `
            + `is running in ${config.NODE_ENV} mode `
            + `on ${config.HOST}:${config.PORT}`);
});
