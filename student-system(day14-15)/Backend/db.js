const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',        // Your PostgreSQL username
  host: 'localhost',
  database: 'student_system',
  password: 'mohit@2027', // Your PostgreSQL password
  port: 5432,
});

module.exports = pool;
