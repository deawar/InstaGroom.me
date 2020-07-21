/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
const db = require('../models');

module.exports = (req, res, next) => {
// Checking for authorization token on the request header
// If not available throw error
// console.log(req.headers);
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send('Unable to authorize user');
  }
  // If authorization token is available
  // First remove Bearer from the authorization token header
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, process.env.JWTKEY, async (error, payload) => {
    if (error) {
      return res.status(401).send('Invalid Token Error');
    }
    const { groomerId } = payload;
    const groomer = await db.Groomer.findById(groomerId);
    req.groomer = groomer;
    // console.log(groomer);
    next();
  });
};