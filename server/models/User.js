const db = require('../db');
const tableName = 'users';

module.exports = {
    all() {
        return db.select().table(tableName);
    },

    findById(id) {
        return db(tableName).where('id', id);
    },

    async findByPhoneOrEmail( phone, email ) {
        if(phone && email) {
            return db(tableName).where('phone', phone.value).orWhere('email', email.value);
        }
        if(phone) {
            return db(tableName).where('phone', phone.value);
        }
        if(email) {
            return db(tableName).where('email', email.value);
        }
        throw new Error("Invalid arguments passed. Neither phone or email are defined");
    },

    add(name, password, phone, email,) {

        const parameters = {};
        if(name && password) { 
            // options['username'] = name;
            // create user salt
            // hash user password
            // options['salt'] = salt
            // options['password'] = hashedPassword
        }
        if(phone) {
            parameters['phone'] = phone.value;
            parameters['is_phone_confirmed'] = false;
            parameters['text_daily'] = phone.daily;
            parameters['text_weekly'] = phone.weekly;
        }
        if(email) {
            parameters['email'] = email.value;
            parameters['is_email_confirmed'] = false;
            parameters['email_daily'] = email.daily;
            parameters['email_weekly'] = email.weekly;
        }
        return db(tableName).insert(parameters);
    },

    async dropTable() {
        await db.raw(`DROP TABLE IF EXISTS ${tableName} CASCADE`);
    },

    async createTable() {
        const exists = await db.schema.hasTable(tableName);
        if(!exists) {
            return db.schema.createTable(tableName, table => {
                table.increments('id').primary();
                table.string('username');
                table.string('password');
                table.string('salt');
                table.string('phone');
                table.boolean('is_phone_confirmed');
                table.string('email');
                table.boolean('is_email_confirmed');
                table.boolean('text_daily').defaultTo(false);
                table.boolean('text_weekly').defaultTo(false);
                table.boolean('email_daily').defaultTo(false);
                table.boolean('email_weekly').defaultTo(false);
            });
        }
    }
}