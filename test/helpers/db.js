
const confirmDatabaseIsEmpty = function (db) {

  return db('counter')
    .first('value')
    .then(() => {

      const message = 'Test database is not empty. '
                    + 'Please drop table "counter" manually then '
                    + 're-run the test suite.';

      return Promise.reject(new Error(message));
    })
    .catch((err) => {

      // Table doesn't exist is what we want to see
      if (!/relation "counter" does not exist/.test(err.message)) {
        throw err;
      }
    });
};

const setupDatabase = function (db) {

  return db.migrate.rollback({}, true)
    .then(() => {
      return db.migrate.latest({});
    })
    .then(() => {
      return db.seed.run({});
    });
};

const teardownDatabase = function (db) {

  return db.migrate.rollback({}, true);
};

const disconnectDatabase = function (db) {

  return db.destroy();
}

module.exports = {
  confirmDatabaseIsEmpty,
  setupDatabase,
  teardownDatabase,
  disconnectDatabase,
};
