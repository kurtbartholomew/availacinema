const db = require('../db');
const tableName = 'users_filters';

module.exports = {
    findByUserId(id) {
        return db(tableName).where('user_id', id);
    },

    async createTable() {
        const exists = await db.schema.hasTable(tableName);
        if(!exists) {
            return db.schema.createTable(tableName, table => {
                table.increments('id').primary();
                table.integer('type');
                table.float('value');
                table.integer('user_id').unsigned();
                table.foreign('user_id').references('users.id');
            });
        }
    }
}