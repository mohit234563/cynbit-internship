const pool = require("../config/db");

const createUser = async (name, email, hashedPassword, role = "user") => {
    const query = `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role`;
    const result = await pool.query(query, [name, email, hashedPassword, role]);
    return result.rows[0];
};

const findUserByEmail = async (email) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
};

module.exports = { createUser, findUserByEmail };
