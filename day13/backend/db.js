const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',          // Your PostgreSQL username
    host: 'localhost',         // Database is on your computer
    database: 'practice_db',    // Your database name
    password: 'mohit@2027', // Your PostgreSQL password
    port: 5432                 // Default PostgreSQL port
});

module.exports = pool;
