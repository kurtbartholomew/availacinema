const db = require('../db');
const tableName = 'movies';

module.exports = {
    TABLE: tableName,

    all() {
        return db.select().table(tableName);
    },

    findById(id) {
        return db(tableName).where('id', id);
    },

    add(title, rating, releaseDate, tmdbKey, omdbKey) {
        const parameters = {
            title,
            rating,
            tmdb_key: tmdbKey,
            release_date: releaseDate
        };
        if(omdbKey) { parameters['omdb_key'] = omdbKey; }
        return db(tableName).insert(parameters).returning('id');
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
                table.string('tmdb_key').notNullable().unique();
                table.string('omdb_key');
            });
        }
    }
}