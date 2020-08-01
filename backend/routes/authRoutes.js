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
    isVerified,
    userToken,
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
      isVerified,
      userToken,
    });
    await groomerUser.save();
    const token = jwt.sign({ groomerId: groomerUser._id }, process.env.JWTKEY);
    db.Groomer.findOneAndUpdate(
      { _id: groomerUser._id },
      { $set: { userToken: token } },
      { new: true },
    )
      .then((updatedGroomer) => res.json({
        error: false,
        data: { updatedGroomer },
        message: ' Successfully created new user. ',
      }));
  } catch (err) {
    return res.status(500).json({
      error: true,
      data: null,
      message: ' An error occurred creating new user. ',
    });
  }
});

// Verify Signed in Route
// This route is to retrive the email id or any other info of user by passing token..
// This is to verify we can get email of user only when valid token is sent..
router.get('/verify/:authorization', authToken, (req, res) => {
  res.status(200).json({
    error: false,
    data: `${req.groomer.email}`,
    message: 'User email has been verified ',
  });
});

// Signin Route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      error: true,
      data: null,
      message: 'Please provide email and password to sign in ',
    });
  }
  const groomerUser = await db.Groomer.findOne({ email });
  if (!groomerUser || groomerUser.isVerified === false) {
    return res.status(400).json({
      error: true,
      data: null,
      message: ' Invalid email/password or User not verified ',
    });
  }
  try {
    await groomerUser.comparePassword(password);
    const token = jwt.sign({ groomerId: groomerUser._id }, process.env.JWTKEY);
    return res.json({
      error: false,
      data: { token },
      message: 'User successfully SignedIn',
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      data: null,
      message: ' Invalid email or password ',
    });
  }
});
module.exports = router;
