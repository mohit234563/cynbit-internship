const pool = require('./db');

async function fetchUsers() {
    try {
        const result = await pool.query('SELECT * FROM users');
        console.table(result.rows);  // Displays results in a table format
    } catch (err) {
        console.error('Error fetching users:', err.message);
    }
}

module.exports = fetchUsers;
