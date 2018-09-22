const db = require('../db');
const tableName = 'confirmations';
const uuid = require('uuid/v4');
const TYPE = {
    PHONE: 0,
    EMAIL: 1
};

module.exports = {
    TYPE,

    findByUserId(id) {
        return db(tableName).where('user_id', id);
    },

    findByGuid(guid) {
        return db(tableName).where('guid', guid);
    },

    add(confirmation) {
        confirmation.guid = uuid();
        return db(tableName).insert(confirmation);
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
                table.string('guid').notNullable();
                table.integer('user_id').unsigned();
                table.foreign('user_id').references('users.id');
            });
        }
    }
}