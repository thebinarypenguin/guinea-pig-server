const TABLE_NAME = 'counter';

exports.up = function (knex, Promise) {

  return knex.schema.dropTableIfExists(TABLE_NAME).then(() => {

    return knex.schema.createTable(TABLE_NAME, (table) => {

      table.increments('id');
      table.integer('value');
    });
  });
};

exports.down = function (knex, Promise) {

  return knex.schema.dropTableIfExists(TABLE_NAME);
};
