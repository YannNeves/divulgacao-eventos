import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('events', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('local').notNullable();
        table.string('photo').notNullable();
        table.string('comment').notNullable();
        table.integer('like').defaultTo(0);
        table.integer('dislike').defaultTo(0);
        table.dateTime("created_at").defaultTo(knex.fn.now());
        table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users');
    });
}


export async function down(knex: Knex) {
    return knex.schema.dropTable('events');
}