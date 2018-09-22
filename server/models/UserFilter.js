const db = require('../db');
const tableName = 'users_filters';
const type = {
    RATING: 0,
    GENRE: 1
};

module.exports = {
    findByUserId(id) {
        return db(tableName).where('user_id', id);
    },

    async add(filters) {
        return db(tableName).insert(filters);
    },

    async dropTable() {
        await db.raw(`DROP TABLE IF EXISTS ${tableName} CASCADE`);
    },

    async createTable() {
        const exists = await db.schema.hasTable(tableName);
        if(!exists) {
            return db.schema.createTable(tableName, table => {
                table.increments('id').primary();
                table.integer('type').notNullable();
                table.string('value').notNullable();
                table.integer('user_id').unsigned();
                table.foreign('user_id').references('users.id');
            });
        }
    }
}