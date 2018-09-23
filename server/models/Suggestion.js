const db = require('../db');
const tableName = 'suggestions';

module.exports = {
    TABLE: tableName,

    findByUserId(id) {
        return db(tableName).where('user_id', id);
    },

    add(title, rating, userId) {
        return db(tableName).insert({
            title,
            rating,
            user_id: userId
        }).returning('id');
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
                table.date('send_date').defaultTo(db.raw('now()')).notNullable();
                table.integer('user_id').unsigned();
                table.foreign('user_id').references('users.id');
            });
        }
    }
}