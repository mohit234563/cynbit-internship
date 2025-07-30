const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',          // Replace with your PostgreSQL username
    host: 'localhost',
    database: 'student_system', // Your DB name
    password: 'mohit@2027',  // Replace with your password
    port: 5432,
});

module.exports = pool;
