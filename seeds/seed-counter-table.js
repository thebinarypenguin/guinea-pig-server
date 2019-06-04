const TABLE_NAME = 'counter';

exports.seed = function (knex, Promise) {

  return knex(TABLE_NAME)
    .del()
    .then(() => {

      return knex(TABLE_NAME).insert({ value: 0 });
    });
};
