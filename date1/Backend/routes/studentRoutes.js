const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { addProfile, addSkills, getAllStudents, getStudentsBySkill } = require('../controllers/studentController');

router.post('/profile', verifyToken, addProfile);
router.post('/skills', verifyToken, addSkills);
router.get('/students', getAllStudents);
router.get('/students/filter', getStudentsBySkill);

module.exports = router;
