const mongoose = require('mongoose');

const { Schema } = mongoose;

const CustomerSchema = new Schema({
  customer: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      required: false,
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
    phone1: {
      type: String,
      validate: {
        validator(v) {
          return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, 'User phone number required'],
    },
    phone2: {
      type: String,
      validate: {
        validator(v) {
          return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, 'User phone number required'],
    },
    email1: {
      type: String,
      required: true,
      lowercase: true,
    },
    email2: {
      type: String,
      required: true,
      lowercase: true,
    },
    numberOfPets: { // this section could be a separate schema type such as PetSchema
      type: Number,
      required: true,
    },
    typeOfPets: {
      type: String,
      required: true,
      petName: {
        type: String,
        age: Number,
        breed: String,
        medicalIssues: String,
      },
    },

  },
});

module.exports = mongoose.model('Customer', CustomerSchema);
