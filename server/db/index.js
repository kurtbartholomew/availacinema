const { Pool } = require('pg');

module.exports = {
    query: (text, params, callback) => Pool.query(text, params, callback)
}