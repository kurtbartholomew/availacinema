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
        if(exists) {
            await db.raw(`DROP TABLE ${tableName} CASCADE`);
        }
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