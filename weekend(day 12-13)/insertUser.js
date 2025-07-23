const pool = require('./db');

async function insertUser(name, email, age) {
    try {
        const result = await pool.query(
            'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *',
            [name, email, age]
        );
        console.log('User added:', result.rows[0]);
    } catch (err) {
        console.error('Error inserting user:', err.message);
    }
}

module.exports = insertUser;
