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

    async createTable() {
        const exists = await db.schema.hasTable(tableName);
        if(exists) {
            await db.raw(`DROP TABLE ${tableName} CASCADE`);
        }
        if(!exists) {
            return db.schema.createTable(tableName, table => {
                table.increments('id').primary();
                table.string('name').notNullable();
                table.integer('tmdb_id').notNullable();
            });
        }
    }
}