const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
  console.log('primary route /');
  res.sendFile(path.join(`${__dirname}./public/index.html`));
});

router.get('/find', (req, res) => {
  res.sendFile(path.join(`${__dirname}./public/customer.html`));
});

module.exports = router;
