require('dotenv').config();   // Loads variables from .env
const { Pool } = require('pg');  // Import 'pg' package

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

module.exports = pool;  // Export the pool for other files
