const db = require('../db');
const tableName = 'users';

module.exports = {
    all() {
        return db.select().table(tableName);
    },

    findById(id) {
        return db(tableName).where('id', id);
    },

    add(name, password, phone, email,) {

        const parameters = {};
        if(name && password) { 
            options['username'] = name;
            // create user salt
            // hash user password
            // options['salt'] = salt
            // options['password'] = hashedPassword
        }
        if(phone) {
            options['phone'] = phone.value;
            options['is_phone_confirmed'] = false;
            options['text_daily'] = phone.daily;
            options['text_weekly'] = phone.weekly;
        }
        if(email) {
            options['email'] = email.value;
            options['is_email_confirmed'] = false;
            options['email_daily'] = email.daily;
            options['email_weekly'] = email.weekly;
        }


        return db(tableName).insert(parameters);
    },

    async createTable() {
        const exists = await db.schema.hasTable(tableName);
        if(!exists) {
            db.schema.createTable(tableName, table => {
                table.increments('id').primary();
                table.string('username');
                table.string('password');
                table.string('salt');
                table.string('phone');
                table.boolean('is_phone_confirmed');
                table.string('email');
                table.boolean('is_email_confirmed');
                table.boolean('text_daily');
                table.boolean('text_weekly');
                table.boolean('email_daily');
                table.boolean('email_weekly');
            });
        }
    }
}