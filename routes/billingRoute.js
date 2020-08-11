const router = require('express').Router();
// const db = require('../models');
const authToken = require('../config/authToken');

// Post Billing Information
router.post('/postbilling', authToken, (req, res) => {
  console.log(req.body);
  try {
    return res.json({
      error: false,
      data: {},
      message: 'Billing Info Sucessfully received',
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      data: error,
      message: 'Error receiving billing info',
    });
  }
});

module.exports = router;
