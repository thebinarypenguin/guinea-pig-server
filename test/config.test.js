/* eslint no-unused-expressions: "off" */
/* globals describe, context, it */

const { expect }   = require('chai');
const { execFile } = require('child_process');

describe('Config Module (config.js)', () => {

  context('when no .env file is present', () => {

    it('should throw an Error', (done) => {

      // Execute config.js in a directory with no .env file

      execFile('node', ['../src/config.js'], { cwd: __dirname }, (err) => {

        expect(err).to.be.an('error');
        expect(err.message).to.match(/Error: ENOENT: no such file or directory/);

        done();
      });

    });
  });

  context('when a .env file is present', () => {

    it('should return a config object populated from env vars', () => {

      /* eslint-disable-next-line global-require */
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
