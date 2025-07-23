const pool = require('./db');

async function deleteUser(identifier) {
    try {
        let result;
        if (!isNaN(identifier)) {  // If input is a number, treat it as ID
            result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [identifier]);
        } else {  // Otherwise, treat it as email
            result = await pool.query('DELETE FROM users WHERE email = $1 RETURNING *', [identifier]);
        }
        if (result.rows.length === 0) {
            console.log('No user found.');
        } else {
            console.log('User deleted:', result.rows[0]);
        }
    } catch (err) {
        console.error('Error deleting user:', err.message);
    }
}

module.exports = deleteUser;
