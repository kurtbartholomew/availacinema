const db = require('../db');
const tableName = 'movies_genres';

module.exports = {
    findByMovieId(id) {
        return db(tableName).where('id', id);
    },

    createTable() {
        return db.schema.createTableIfNotExists(tableName, table => {
            table.increments('id').primary();
            table.string('name');
            table.integer('movie_id').unsigned();
            table.foreign('movie_id').references('movies.id');
        });
    }
}