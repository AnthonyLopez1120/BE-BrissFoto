
exports.up = function(knex) {
    return knex.schema.createTable('user', tbl => {
        tbl.increments();
        tbl.text('first-name', 128)
            .notNullable()
            .unique();
        tbl.text('last-name', 128)
            .notNullable()
            .unique();
        tbl.text('user-name', 128)
            .notNullable()
            .unique();
        tbl.text('password', 128)
            .notNullable()
            .unique();
    }) 
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExist('user');
};
