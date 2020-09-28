
exports.up = function(knex, Promise) {
    return knex.schema.createTable('blog', tbl => {
        tbl.increments();
        tbl.string('blog-post', 2500);
        tbl.integer('user-id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('user');
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExist('blog');
};
