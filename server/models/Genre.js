const db = require('../db');
const tableName = 'genres';

module.exports = {
    all() {
        return db.select().table(tableName);
    },

    findByTMDBId(id) {
        return db(tableName).where('tmdb_id', id);
    },

    add(name, tmdbId) {
        return db(tableName).insert({
            name,
            tmdb_id: tmdbId
        });
    },

    update(name, tmdbId) {
        return db(tableName).where('name', name).update({
            tmdb_id: tmdbId
        });
    },

    createTable() {
        return db.schema.createTableIfNotExists(tableName, table => {
            table.increments('id').primary();
            table.string('name');
            table.integer('tmdb_id');
        });
    }
}