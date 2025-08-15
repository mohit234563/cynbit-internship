const express = require('express');
const router = express.Router();
const { getStats, downloadCSV } = require('../controllers/analyticsController');

router.get('/stats', getStats);
router.get('/stats/export', downloadCSV);

module.exports = router;
