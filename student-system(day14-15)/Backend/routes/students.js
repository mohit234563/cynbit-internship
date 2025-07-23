const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const students = await pool.query('SELECT id, name, email, branch, year FROM students');
        res.status(200).json(students.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Unable to fetch students' });
    }
    
});
console.log("student routes loaded");
module.exports = router;
