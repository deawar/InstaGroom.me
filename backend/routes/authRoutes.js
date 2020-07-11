const router = require('express').Router();
const db = require('../models');

router.post('/signup', (req, res) => {
  console.log(req.body);

  const {
    firstName,
    lastName,
    street,
    city,
    state,
    zip,
    phone,
    email,
    password,
  } = req.body;
  const user = new db.Groomer({
    firstName,
    lastName,
    street,
    city,
    state,
    zip,
    phone,
    email,
    password,
  });
  user.save();

  res.send(`Hello ${email}`);
});

module.exports = router;
