const express = require('express');
const logger  = require('./logger');
const router  = require('./router');

const app = express();

app.use(logger);
app.use('/', router);

module.exports = app;
