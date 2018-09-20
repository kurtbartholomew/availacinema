const db = require('../db');
const tableName = 'genres';

module.exports = {
    all() {
        return db.select().table(tableName);
    },

    findByUserId(id) {
        return db(tableName).where('user_id', id);
    },

    add(title, rating, userId) {
        return db(tableName).insert({
            title,
            rating,
            user_id: userId
        })
    },

    async createTable() {
        const exists = await db.schema.hasTable(tableName);
        if(!exists) {
            return db.schema.createTable(tableName, table => {
                table.increments('id').primary();
                table.string('title');
                table.float('rating');
                table.date('send_date').defaultTo(db.raw('now()'));
                table.integer('user_id').unsigned();
                table.foreign('user_id').references('users.id');
            });
        }
    }
}