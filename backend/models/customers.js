const mongoose = require('mongoose');

const { Schema } = mongoose;

const CustomerSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: 'Please enter customer first name',
  },
  lastName: {
    type: String,
    trim: true,
    required: 'Please enter customer last name',
  },
  street: {
    type: String,
    trim: true,
    required: 'Please enter street for customer',
  },
  city: {
    type: String,
    trim: true,
    required: 'Please enter a city',
  },
  state: {
    type: String,
    trim: true,
    required: 'Please enter a state',
  },
  zip: {
    type: String,
    trim: true,
    required: 'Please enter a zip code',
  },
  phone1: {
    type: String,
    trim: true,
    validate: {
      validator(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: 'User phone number required',
  },
  phone2: {
    type: String,
    trim: true,
  },
  email1: {
    type: String,
    trim: true,
    required: 'Please enter an email address',
    lowercase: true,
    validate: {
      validator(v) {
        return /^\S+@\S+\.\S+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  email2: {
    type: String,
    trim: true,
    lowercase: true,
  },
  numberOfPets: {
    // this section could be a separate schema type such as PetSchema
    type: Number,
    required: true,
  },
  petDetail: [
    {
      petName: {
        type: String,
        trim: true,
        required: 'Please enter Pets name',
      },
      age: {
        type: Number,
      },
      gender: {
        type: String,
        trim: true,
      },
      breed: {
        type: String,
        trim: true,
      },
      weight: {
        type: Number,
        trim: true,
      },
      medicalCondition: {
        type: String,
      },
    },
  ],
  date_created: {
    type: Date,
    default: () => Date().now,
  },
});

module.exports = mongoose.model('Customer', CustomerSchema);
