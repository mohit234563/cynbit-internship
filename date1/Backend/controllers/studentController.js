const pool = require('../config/db');

exports.addProfile = async (req, res) => {
  const { branch, year, linkedin, github } = req.body;
  try {
    await pool.query(
      'UPDATE users SET branch=$1, year=$2, linkedin=$3, github=$4 WHERE id=$5',
      [branch, year, linkedin, github, req.user.id]
    );
    res.json({ message: 'Profile updated' });
  } catch {
    res.status(500).json({ error: 'Update failed' });
  }
};

exports.addSkills = async (req, res) => {
  const { skills } = req.body; // array of strings
  try {
    for (let skill of skills) {
      await pool.query('INSERT INTO skills (user_id, skill) VALUES ($1, $2)', [req.user.id, skill]);
    }
    res.json({ message: 'Skills added' });
  } catch {
    res.status(500).json({ error: 'Skill insert failed' });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT users.id, name, branch, year, linkedin, github, 
      ARRAY_AGG(skill) AS skills 
      FROM users
      LEFT JOIN skills ON users.id = skills.user_id
      GROUP BY users.id
    `);
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

exports.getStudentsBySkill = async (req, res) => {
  const { skill } = req.query;
  try {
    const result = await pool.query(`
      SELECT users.id, name, branch, year, linkedin, github, 
      ARRAY_AGG(skill) AS skills 
      FROM users
      LEFT JOIN skills ON users.id = skills.user_id
      WHERE users.id IN (
        SELECT user_id FROM skills WHERE skill ILIKE $1
      )
      GROUP BY users.id
    `, [`%${skill}%`]);
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: 'Skill filter failed' });
  }
};
