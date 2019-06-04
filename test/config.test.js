/* eslint no-unused-expressions: "off" */
/* globals describe, context, it */

const { expect }   = require('chai');
const { execFile } = require('child_process');

describe('Config Module (config.js)', () => {

  context('when no .env file is present', () => {

    it('should throw an Error', () => {

      // Execute config.js in a directory with no .env file
      return new Promise((resolve, reject) => {

        execFile('node', ['../src/config.js'], { cwd: __dirname }, (err) => {

          if (err && /Error: ENOENT: no such file or directory/.test(err.message)) {
            resolve(true);
          } else {
            reject(false);
          }
        });
      });
    });
  });

  context('when a .env file is present', () => {

    it('should return a config object populated from env vars', () => {

      const config = require('../src/config');

      expect(config).to.have.property('NODE_ENV');
      expect(config).to.have.property('HOST');
      expect(config).to.have.property('PORT');
      expect(config).to.have.property('LOG_FORMAT');
      expect(config).to.have.property('DB_CLIENT');
      expect(config).to.have.property('DB_CONNECTION_STRING');
      expect(config).to.have.property('TEST_DB_CLIENT');
      expect(config).to.have.property('TEST_DB_CONNECTION_STRING');
    });
  });
});
