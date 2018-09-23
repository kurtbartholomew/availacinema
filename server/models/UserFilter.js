const db = require('../db');
const tableName = 'users_filters';
const TYPE = {
    RATING: 0,
    GENRE: 1
};

module.exports = {
    TYPE,
    TABLE: tableName,

    findByUserId(id) {
        return db(tableName).where('user_id', id);
    },

    add(type, value, userId) {
        const parameters = {
            type,
            value,
            user_id: userId
        };
        return db(tableName).insert(parameters).returning('id');
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