const config = require('../src/config');

const { expect }   = require('chai');
const { execFile } = require('child_process');
const request      = require('request');

describe('Logging Module (logger.js)', () => {

  context('when process.env.LOG_FORMAT is "dev"', () => {

    // timeout expanded
    it('should output a line for each request', (done) => {

      // This one is tricky. In order to test that out logger outputs the
      // correct data to stdout and stderr, we have to run `node src/server.js`
      // as a child process and monitor it.

      const execOpts = {
        env: {
          HOST        : config.HOST,
          PORT        : 55556,
          LOG_FORMAT  : 'dev',
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
      const server = execFile('node', ['src/server.js'], execOpts, (err, stdout, stderr) => {

        const lines = stdout.split('\n');

        expect(err.killed).to.be.true;
        expect(err.code).to.be.null;
        expect(err.signal).to.equal('SIGTERM');
        expect(lines[0]).to.match(/guinea-pig-server.+ is running/);
        expect(lines[1]).to.match(/.+GET \/ .+ ms - 9/);
        expect(stderr).to.be.empty;

        done();
      });

      const requestOpts = {
        method: 'GET',
        uri: `http://${config.HOST}:55556`,
      };

      // Wait 1 second, Make an HTTP request to the server
      setTimeout(() => {

        request(requestOpts, (err, response, body) => {

          expect(err).to.be.null;
          expect(response.statusCode).to.equal(200);
          expect(body).to.equal('Hi There!');

          server.kill();
        });

      }, 1 * 1000);

    }).timeout(3 * 1000);
  });

  context('when process.env.LOG_FORMAT is "none"', () => {

    // timeout expanded
    it('should output nothing for each request', (done) => {

      // This one is tricky. In order to test that out logger outputs the
      // correct data to stdout and stderr, we have to run `node src/server.js`
      // as a child process and monitor it.

      const execOpts = {
        env: {
          HOST        : config.HOST,
          PORT        : 55557,
          LOG_FORMAT  : 'none',
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
      const server = execFile('node', ['src/server.js'], execOpts, (err, stdout, stderr) => {

        const lines = stdout.split('\n');

        expect(err.killed).to.be.true;
        expect(err.code).to.be.null;
        expect(err.signal).to.equal('SIGTERM');
        expect(lines[0]).to.match(/guinea-pig-server.+ is running/)
        expect(lines[1]).to.be.empty;
        expect(stderr).to.be.empty;

        done();
      });

      const requestOpts = {
        method: 'GET',
        uri: `http://${config.HOST}:55557`,
      };

      // Wait 1 second, Make an HTTP request to the server
      setTimeout(() => {

        request(requestOpts, (err, response, body) => {

          expect(err).to.be.null;
          expect(response.statusCode).to.equal(200);
          expect(body).to.equal('Hi There!');

          server.kill();
        });

      }, 1 * 1000);

    }).timeout(3 * 1000);
  });
});
