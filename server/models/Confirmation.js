const db = require('../db');
const tableName = 'confirmations';
const uuid = require('uuid/v4');
const TYPE = {
    PHONE: 0,
    EMAIL: 1
};

module.exports = {
    TYPE,
    TABLE: tableName,

    findByUserId(id) {
        return db(tableName).where('user_id', id);
    },

    findByGuid(guid) {
        return db(tableName).where('guid', guid);
    },

    add(type, userId) {
        const parameters = {
            type,
            user_id: userId
        };
        parameters.guid = uuid();
        return db(tableName).insert(parameters).returning('guid');
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
                table.string('guid').notNullable();
                table.integer('user_id').unsigned();
                table.foreign('user_id').references('users.id').onDelete("CASCADE");
            });
        }
    }
}