const express = require('express');
const cors    = require('cors');
const logger  = require('./logger');
const router  = require('./router');

const app = express();

app.use(cors());

app.use(logger);
app.use('/', router);

module.exports = app;
