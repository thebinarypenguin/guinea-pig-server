const dotenv = require('dotenv');

dotenv.config();

const { NODE_ENV } = process.env;

const { HOST } = process.env;
const { PORT } = process.env;

const { LOG_FORMAT } = process.env;

const DB_CLIENT = 'pg';
const DB_CONNECTION_STRING = 'postgres://'
  + `${process.env.DB_USERNAME}:`
  + `${process.env.DB_PASSWORD}@`
  + `${process.env.DB_HOST}:`
  + `${process.env.DB_PORT}/`
  + `${process.env.DB_DATABASE}`;

const TEST_DB_CLIENT = 'pg';
const TEST_DB_CONNECTION_STRING = 'postgres://'
  + `${process.env.TEST_DB_USERNAME}:`
  + `${process.env.TEST_DB_PASSWORD}@`
  + `${process.env.TEST_DB_HOST}:`
  + `${process.env.TEST_DB_PORT}/`
  + `${process.env.TEST_DB_DATABASE}`;

module.exports = {
  NODE_ENV,
  HOST,
  PORT,
  LOG_FORMAT,
  DB_CLIENT,
  DB_CONNECTION_STRING,
  TEST_DB_CLIENT,
  TEST_DB_CONNECTION_STRING,
};
