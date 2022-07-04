
exports.up = knex => knex.schema.createTable('users', table => {
    
    table.increments('id').unsigned().primary();
    table.string('name', 50).notNullable();
    table.string('email', 150).unique().notNullable();
    table.string('password', 200).notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

});

exports.down = knex => knex.schema.dropTableIfExists('users');

