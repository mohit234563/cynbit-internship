const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db');

const router = express.Router();

// Register new student
router.post('/register', async (req, res) => {
    const { name, email, password, branch, year } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password
        const result = await pool.query(
            'INSERT INTO students (name, email, password, branch, year) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, email, hashedPassword, branch, year]
        );
        res.json({ success: true, student: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error registering student' });
    }
});

// Login student
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM students WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const student = result.rows[0];
        const match = await bcrypt.compare(password, student.password);

        if (!match) return res.status(400).json({ success: false, message: 'Invalid email or password' });

        req.session.studentId = student.id; // Save session
        res.json({ success: true, studentId: student.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

module.exports = router;
