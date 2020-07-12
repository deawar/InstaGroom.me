const router = require('express').Router();
const path = require('path');
const authToken = require('../config/authToken');

router.get('/', (req, res) => {
  console.log('primary route /');
  res.sendFile(path.join(`${__dirname}./public/index.html`));
});

router.get('/find', (req, res) => {
  res.sendFile(path.join(`${__dirname}./public/index.html`));
});

module.exports = router;
