/* eslint no-unused-expressions: "off" */
/* globals describe, context, it, before, beforeEach, after, afterEach */

const config = require('../src/config');

config.LOG_FORMAT = 'none';

const { expect }   = require('chai');
const supertest    = require('supertest');
const knex         = require('knex');
const { execFile } = require('child_process');
const request      = require('request');
const dbHelpers    = require('./helpers/db');
const app          = require('../src/app');

const db = knex({
  client     : config.TEST_DB_CLIENT,
  connection : config.TEST_DB_CONNECTION_STRING,
});

app.set('db', db);

describe('Routes (router.js)', () => {

  before(() => {
    return dbHelpers.confirmDatabaseIsEmpty(db);
  });

  beforeEach(() => {
    return dbHelpers.setupDatabase(db);
  });

  afterEach(() => {
    return dbHelpers.teardownDatabase(db);
  });

  after(() => {
    return dbHelpers.disconnectDatabase(db);
  });

  describe('GET /', () => {

    it('should respond with "Hi There!" (200 OK)', () => {

      return supertest(app)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect(200)
        .then((resp) => {
          expect(resp.text).to.equal('Hi There!');
        });
    });
  });

  describe('GET /counter', () => {

    it('should respond with the current value (200 OK)', () => {

      return supertest(app)
        .get('/counter')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((resp) => {
          expect(resp.body.value).to.equal(0);
        });
    });
  });

  describe('PUT /counter', () => {

    context('with missing "step"', () => {

      it('should return an error (400)', () => {

        return supertest(app)
          .put('/counter')
          .expect(400)
          .then((resp) => {
            expect(resp.body.error).to.equal('"step" is required');
          });
      });
    });

    context('with invalid "step"', () => {

      it('should return an error (400)', () => {

        return supertest(app)
          .put('/counter')
          .send({ step: 'INVALID' })
          .expect(400)
          .then((resp) => {
            expect(resp.body.error).to.equal('"step" must be an integer');
          });
      });
    });

    context('with valid "step"', () => {

      it('should return the new value (200)', () => {

        return supertest(app)
          .put('/counter')
          .send({ step: 1 })
          .expect(200)
          .then((resp) => {
            expect(resp.body.value).to.equal(1);
          });
      });
    });
  });

  describe('GET /status', () => {

    it('should respond with an empty body (200 OK)', () => {

      return supertest(app)
        .get('/status')
        .expect(200)
        .then((resp) => {
          expect(resp.text).to.eql('');
          expect(resp.body).to.eql({});
        });
    });
  });

  describe('POST /crash', () => {

    // timeout extended
    it('should kill the server process', (done) => {

      // This one is tricky. In order to test that our /crash route actually
      // stops to server process, we have to run `node src/server.js` as a
      // child process and monitor it.

      const execOpts = {
        env: {
          HOST        : config.HOST,
          PORT        : 55555,
          LOG_FORMAT  : config.LOG_FORMAT,
          DB_HOST     : config.TEST_DB_HOST,
          DB_PORT     : config.TEST_DB_PORT,
          DB_USERNAME : config.TEST_DB_USERNAME,
          DB_PASSWORD : config.TEST_DB_PASSWORD,
          DB_DATABASE : config.TEST_DB_DATABASE,
        },
        timeout: 2 * 1000,
      };

      // Execute server, listen on ephemeral TCP port,
      // the callback runs after the server process stops
      execFile('node', ['src/server.js'], execOpts, (err, stdout, stderr) => {

        // We expect the server to exit with code 187. If that doesn't happen
        // the process will automatically be killed after 2 seconds with a code
        // of null

        expect(err.code).to.equal(187);
        done();
      });

      const requestOpts = {
        method : 'POST',
        uri    : `http://${config.HOST}:55555/crash`,
      };

      // Wait 1 second, Make an HTTP request to the server
      setTimeout(() => {

        request(requestOpts, (err, response, body) => {

          // If successful the server process will stop before
          // sending a response, hence the socket hang up error

          expect(err.message).to.equal('socket hang up');
        });

      }, 1 * 1000);

    }).timeout(3 * 1000);
  });
});
