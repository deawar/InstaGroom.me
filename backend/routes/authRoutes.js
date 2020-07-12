/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const db = require('../models');
const authToken = require('../config/authToken');

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
    const token = jwt.sign({ groomerId: groomer._id }, process.env.JWTKEY);
    return res.send({ token });
  } catch (err) {
    console.error(err);
    return res.status(422).send(err.message);
  }
});

// This route is to retrive the email id or any other info of user by passing token..
// This is to verify we can get email of user only when valid token is sent..
router.get('/verify', authToken, (req, res) => {
  res.send(`User has been verified, your email address is ${req.groomer.email}`);
});

module.exports = router;
