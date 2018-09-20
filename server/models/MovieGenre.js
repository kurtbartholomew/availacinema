const db = require('../db');
const tableName = 'movies_genres';

module.exports = {
    findByMovieId(id) {
        return db(tableName).where('id', id);
    },

    async createTable() {
        const exists = await db.schema.hasTable(tableName);
        if(!exists) {
            return db.schema.createTable(tableName, table => {
                table.increments('id').primary();
                table.string('name');
                table.integer('movie_id').unsigned();
                table.foreign('movie_id').references('movies.id');
            });
        }
    }
}