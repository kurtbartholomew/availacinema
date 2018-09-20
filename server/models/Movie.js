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

    createTable() {
        return db.schema.createTableIfNotExists(tableName, table => {
            table.increments('id').primary();
            table.string('title');
            table.float('rating');
            table.date('release_date');
            table.string('tmdb_key');
            table.string('omdb_key');
        });
    }
}