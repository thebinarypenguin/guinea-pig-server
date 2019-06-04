/* eslint no-unused-expressions: "off" */
/* globals describe, it */

const { expect } = require('chai');
const config     = require('../src/config');

describe('Config Module (config.js)', () => {

  it('should return a config object populated from env vars', () => {

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
