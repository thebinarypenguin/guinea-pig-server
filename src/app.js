const express = require('express');
const logger  = require('./logger');
const router  = require('./router');
// const errorHandler = require('./errorHandler');

const app = express();

app.use(logger);
app.use('/', router);
// app.use(errorHandler);

module.exports = app;
