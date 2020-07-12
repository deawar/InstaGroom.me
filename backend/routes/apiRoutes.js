const router = require('express').Router();
// const db = require('../models');
const authToken = require('../config/authToken');

// Test AuthToken
router.get('/hey', authToken, (req, res) => {
  res.send('Ho!');
});

module.exports = router;
