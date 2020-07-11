const router = require('express').Router();
const db = require('../models');

router.post('/signup', async (req, res) => {
  //   console.log(req.body);
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

  try {
    const groomer = new db.Groomer({
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
    await groomer.save();
    return res.send(`${email} sucessfully signed up`);
  } catch (err) {
    console.error(err);
    return res.status(422).send(err.message);
  }
});

module.exports = router;
