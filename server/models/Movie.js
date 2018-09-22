const db = require('../db');
const tableName = 'movies';

module.exports = {
    all() {
        return db.select().table(tableName);
    },

    findById(id) {
        return db(tableName).where('id', id);
    },

    add(title, rating, tmdbKey, omdbKey) {
        return db(tableName).insert({
            title,
            rating,
            tmdb_key: tmdbKey,
            omdb_key: omdbKey
        });
    },

    findMatchingUserFilters(genreFilters, ratingFilter, isDaily) {
        return db(tableName).where('rating', '>=', rating);
    },

    async dropTable() {
        await db.raw(`DROP TABLE IF EXISTS ${tableName} CASCADE`);
    },

    async createTable() {
        const exists = await db.schema.hasTable(tableName);
        if(!exists) {
            return db.schema.createTable(tableName, table => {
                table.increments('id').primary();
                table.string('title').notNullable();
                table.float('rating').notNullable();
                table.date('release_date').notNullable();
                table.string('tmdb_key').notNullable();
                table.string('omdb_key');
            });
        }
    }
}