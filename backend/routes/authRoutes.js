/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const db = require('../models');
const authToken = require('../config/authToken');

// Signup Route
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
    const groomerUser = new db.Groomer({
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
    await groomerUser.save();
    const token = jwt.sign({ groomerId: groomerUser._id }, process.env.JWTKEY);
    return res.send({ token });
  } catch (err) {
    console.error(err);
    return res.status(422).send(err.message);
  }
});

// Verify Signed in Route
// This route is to retrive the email id or any other info of user by passing token..
// This is to verify we can get email of user only when valid token is sent..
router.get('/verify', authToken, (req, res) => {
  res.send(
    `User has been verified, your email address is ${req.groomer.email}`,
  );
});

// Signin Route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send('Please provide email and password to sign in');
  }
  const groomerUser = await db.Groomer.findOne({ email });
  if (!groomerUser) {
    return res.status(422).send('Invalid email or password');
  }
  try {
    await groomerUser.comparePassword(password);
    const token = jwt.sign({ groomerId: groomerUser._id }, process.env.JWTKEY);
    return res.send({ token });
  } catch (err) {
    return res.status(422).send('Invalid email or password');
  }
});
module.exports = router;
