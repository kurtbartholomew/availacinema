const knex = require ('knex');

const db = knex({
    client: 'pg',
    connetion: {
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: process.env.DBDATABASE,
        port: process.env.DBPORT
    },
    useNullAsDefault: true
});

module.exports = db;