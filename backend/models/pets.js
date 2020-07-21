const mongoose = require('mongoose');

const { Schema } = mongoose;

const PetSchema = new Schema({
  pet: {
    firstName: {
      type: String,
      required: true,
    },
