const config = require('./config');

const app = require('./app');
const pkg = require('../package.json');

app.listen(config.PORT, config.HOST, () => {
  console.log(
    `${pkg.name}@${pkg.version} ` +
    `is running in ${config.NODE_ENV} mode ` +
    `on ${config.HOST}:${config.PORT}`);
});
