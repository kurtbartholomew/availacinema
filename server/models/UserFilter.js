const db = require('../db');
const tableName = 'users_filters';

module.exports = {
    findByUserId(id) {
        return db(tableName).where('user_id', id);
    },

    createTable() {
        return db.schema.createTableIfNotExists(tableName, table => {
            table.increments('id').primary();
            table.integer('type');
            table.float('value');
            table.integer('user_id').unsigned();
            table.foreign('user_id').references('users.id');
        });
    }
}