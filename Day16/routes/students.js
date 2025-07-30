const express = require('express');
const pool = require('../db');
const router = express.Router();

// GET all students
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM students_tb');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST a new student
router.post('/', async (req, res) => {
    const { name, email, course } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO students_tb (name, email, course) VALUES ($1, $2, $3) RETURNING *',
            [name, email, course]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
