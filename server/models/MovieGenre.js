const db = require('../db');
const tableName = 'movies_genres';

module.exports = {
    findByMovieId(id) {
        return db(tableName).where('id', id);
    },

    async createTable() {
        const exists = await db.schema.hasTable(tableName);
        if(exists) {
            await db.raw(`DROP TABLE ${tableName} CASCADE`);
        }
        if(!exists) {
            return db.schema.createTable(tableName, table => {
                table.increments('id').primary();
                table.string('name').notNullable()
                table.integer('movie_id').unsigned();
                table.foreign('movie_id').references('movies.id');
            });
        }
    }
}