exports.up = function(knex) {
    return knex.schema.createTable('user', tbl => {
        tbl.increments()
        tbl.text('first-name')
            .notNullable()
        tbl.text('last-name')
            .notNullable()
        tbl.text('username', 128)
            .notNullable()
            .unique();
        tbl.text('password', 128)
            .notNullable();
    }) 
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExist('user');
};