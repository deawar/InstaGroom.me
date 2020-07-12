/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const GroomerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    validate: {
      validator(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'User phone number required'],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// This will be executed before the user is created and saved see the word "pre"
// Hashing password if modified or before creating user
GroomerSchema.pre('save', function (next) {
  const groomerUser = this;
  console.log(groomerUser);
  // only hash the password if it has been modified (or is new)
  if (!groomerUser.isModified('password')) return next();
  // generate a salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash(groomerUser.password, salt, (error, hash) => {
      if (error) {
        return next(err);
      }
      // override the cleartext password with the hashed one
      groomerUser.password = hash;
      console.log(groomerUser.password);
      return next();
    });
  });
});

// Comparing the password
GroomerSchema.methods.comparePassword = function (userEnteredPassword) {
  const groomerUser = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(userEnteredPassword, groomerUser.password, (err, isMatch) => {
      if (err) return reject(err);
      if (!isMatch) return reject(err);
      resolve(true);
    });
  });
};

module.exports = mongoose.model('Groomer', GroomerSchema);
