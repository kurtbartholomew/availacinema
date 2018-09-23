const db = require('../db');
const tableName = 'movies_genres';

module.exports = {
    TABLE: tableName,

    add(movieId, genreId) {
        const parameters = {
            movie_id: movieId,
            genre_id: genreId
        }
        return db(tableName).insert(parameters).returning('id');
    },

    findByMovieId(id) {
        return db(tableName).where('id', id);
    },

    async dropTable() {
        await db.raw(`DROP TABLE IF EXISTS ${tableName} CASCADE`);
    },

    async createTable() {
        const exists = await db.schema.hasTable(tableName);
        if(!exists) {
            return db.schema.createTable(tableName, table => {
                table.increments('id').primary();
                table.integer('movie_id').unsigned();
                table.foreign('movie_id').references('movies.id');
                table.integer('genre_id').unsigned();
                table.foreign('genre_id').references('genres.id');
            });
        }
    }
}