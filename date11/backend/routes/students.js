const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const search = req.query.search || '';

  try {
    const dataQuery = `
      SELECT * FROM students
      WHERE name ILIKE $1
      ORDER BY id
      LIMIT $2 OFFSET $3
    `;
    const countQuery = `
      SELECT COUNT(*) FROM students
      WHERE name ILIKE $1
    `;

    const dataResult = await pool.query(dataQuery, [`%${search}%`, limit, offset]);
    const countResult = await pool.query(countQuery, [`%${search}%`]);

    res.json({
      students: dataResult.rows,
      totalItems: parseInt(countResult.rows[0].count),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;

