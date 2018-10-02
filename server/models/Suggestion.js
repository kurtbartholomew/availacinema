const db = require('../db');
const tableName = 'suggestions';

module.exports = {
    TABLE: tableName,

    findByUserId(id) {
        return db(tableName).where('user_id', id);
    },

    add(title, rating, userId, movieId) {
        return db(tableName).insert({
            title,
            rating,
            user_id: userId,
            movie_id: movieId
        }).returning('id');
    },

    addAll(suggestions) {
        const formatted = suggestions.map((suggestion) => {
            return {
                title: suggestion.title,
                rating: suggestion.rating,
                user_id: suggestion.userId,
                movie_id: suggestion.movieId
            };
        });
        return db(tableName).insert(formatted).returning('id');
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
                table.foreign('user_id').references('users.id').onDelete("CASCADE");
                table.integer('movie_id').unsigned();
                table.foreign('movie_id').references('movies.id').onDelete("CASCADE");
            });
        }
    }
}