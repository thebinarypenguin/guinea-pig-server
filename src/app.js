const express = require('express');
const logger  = require('./logger');

const app = express();

app.use(logger);

app.get('/', (req, res) => {
  res.send('Hi There!');
});

module.exports = app;
