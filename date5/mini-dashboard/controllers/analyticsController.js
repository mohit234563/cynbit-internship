const pool = require('../db');

exports.getStats = async (req, res) => {
  try {
    const total = await pool.query('SELECT COUNT(*) FROM students');
    const byBranch = await pool.query('SELECT branch, COUNT(*) FROM students GROUP BY branch');
    const recent = await pool.query('SELECT name, email, branch, course FROM students ORDER BY id DESC LIMIT 5');

    res.json({
      total: parseInt(total.rows[0].count),
      byBranch: byBranch.rows,
      recent: recent.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error fetching stats' });
  }
};

exports.downloadCSV = async (req, res) => {
  try {
    const result = await pool.query('SELECT name, email, branch, course FROM students');
    const headers = Object.keys(result.rows[0]);
    const csvRows = [
      headers.join(','),
      ...result.rows.map(row => headers.map(h => `"${row[h]}"`).join(','))
    ];
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=students.csv');
    res.send(csvRows.join('\n'));
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error generating CSV' });
  }
};
