
exports.up = function(knex) {
    return knex.schema.createTable('blog', tbl => {
        tbl.increments();
        tbl.string('blog-post', 2500);
        tbl.interger('user-id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('user')
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExist('blog');
};
